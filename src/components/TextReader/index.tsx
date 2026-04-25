import React, { useEffect, useState, useCallback } from 'react';
import styles from './styles.module.css';

interface Position {
  x: number;
  y: number;
}

const TextReader: React.FC = () => {
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [translationPosition, setTranslationPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  // 检测文本语言
  const detectLanguage = useCallback((text: string): string => {
    const chineseRegex = /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/;
    const chineseCount = (text.match(new RegExp(chineseRegex, 'g')) || []).length;
    
    const englishRegex = /[a-zA-Z]/;
    const englishCount = (text.match(new RegExp(englishRegex, 'g')) || []).length;
    
    if (chineseCount > 0) {
      return 'zh-CN';
    }
    
    if (englishCount > text.length * 0.5) {
      return 'en-US';
    }
    
    return 'en-US';
  }, []);

  // 使用在线 TTS API 朗读（备用方案）
  const speakWithOnlineTTS = useCallback(async (text: string, lang: string) => {
    try {
      setIsReading(true);
      
      const langCode = lang.startsWith('zh') ? 'zh' : 'en';
      const ttsUrl = `https://fanyi.baidu.com/gettts?lan=${langCode}&text=${encodeURIComponent(text)}&spd=5&source=web`;
      
      const audio = new Audio(ttsUrl);
      
      audio.onended = () => {
        setIsReading(false);
      };
      
      audio.onerror = () => {
        setIsReading(false);
        const youdaoUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=${lang.startsWith('zh') ? '2' : '1'}`;
        const youdaoAudio = new Audio(youdaoUrl);
        
        youdaoAudio.onended = () => {
          setIsReading(false);
        };
        
        youdaoAudio.onerror = () => {
          setIsReading(false);
        };
        
        youdaoAudio.play().catch(() => {
          setIsReading(false);
        });
      };
      
      await audio.play();
    } catch (error) {
      setIsReading(false);
    }
  }, []);

  // 文本朗读功能
  const speakText = useCallback((text: string, lang?: string) => {
    if (!('speechSynthesis' in window)) {
      return;
    }
    
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    
    setTimeout(() => {
      const detectedLang = lang || detectLanguage(text);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = detectedLang;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      const voices = window.speechSynthesis.getVoices();
      
      if (voices.length > 0) {
        let selectedVoice = null;
        
        if (detectedLang.startsWith('zh')) {
          selectedVoice = voices.find(v => v.lang.includes('zh-CN') || v.lang.includes('zh'));
        } else {
          selectedVoice = voices.find(v => v.lang.includes('en-US') || v.lang.includes('en'));
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }
      
      utterance.onstart = () => {
        setIsReading(true);
      };
      
      utterance.onend = () => {
        setIsReading(false);
      };
      
      utterance.onerror = () => {
        setIsReading(false);
      };
      
      window.speechSynthesis.speak(utterance);
      
      setTimeout(() => {
        if (!window.speechSynthesis.speaking && window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }, 100);
    }, 100);
  }, [detectLanguage]);

  // 停止朗读
  const stopReading = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    // 停止所有音频播放
    document.querySelectorAll('audio').forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    setIsReading(false);
  }, []);

  // 翻译功能（使用免费的翻译 API）
  const translateText = useCallback(async (text: string) => {
    try {
      const isChinese = /[\u4e00-\u9fa5]/.test(text);
      const targetLang = isChinese ? 'en' : 'zh-CN';
      
      const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${isChinese ? 'zh-CN' : 'en'}|${targetLang}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      } else {
        throw new Error('翻译失败');
      }
    } catch (error) {
      return null;
    }
  }, []);

  // 处理文本选择
  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    if (text && text.length > 0) {
      setSelectedText(text);
      
      // 获取选中文本的位置
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      
      if (rect) {
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10
        });
        setShowMenu(true);
      }
    } else {
      // 取消选中时，只关闭菜单，不关闭翻译弹框
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      setIsReading(false);
      setShowMenu(false);
      // 不关闭翻译弹框：setShowTranslation(false);
    }
  }, []);

  // 朗读选中的文本
  const handleRead = useCallback(() => {
    if (!selectedText || !('speechSynthesis' in window)) {
      return;
    }
    
    if (isReading || window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(selectedText);
    const detectedLang = detectLanguage(selectedText);
    utterance.lang = detectedLang;
    
    const voices = window.speechSynthesis.getVoices();
    
    if (voices.length > 0) {
      let voice = null;
      
      if (detectedLang.startsWith('zh')) {
        voice = voices.find(v => v.name.includes('Microsoft') && v.lang.includes('zh')) ||
                voices.find(v => !v.name.includes('Google') && v.lang.includes('zh')) ||
                voices.find(v => v.lang.includes('zh'));
      } else {
        voice = voices.find(v => v.name.includes('Microsoft') && v.lang.includes('en'));
        
        if (!voice) {
          voice = voices.find(v => v.name.includes('Microsoft') && v.lang.includes('zh'));
        }
        
        if (!voice) {
          voice = voices.find(v => !v.name.includes('Google') && v.lang.includes('en'));
        }
      }
      
      if (voice) {
        utterance.voice = voice;
      }
    }
    
    utterance.onstart = () => {
      setIsReading(true);
    };
    
    utterance.onend = () => {
      setIsReading(false);
    };
    
    utterance.onerror = () => {
      setIsReading(false);
    };
    
    window.speechSynthesis.speak(utterance);
  }, [selectedText, isReading, detectLanguage]);

  // 翻译并朗读
  const handleTranslateAndRead = useCallback(async () => {
    if (selectedText) {
      // 立即显示弹框，显示"翻译中..."
      setTranslatedText('翻译中...');
      setShowTranslation(true);
      setTranslationPosition({
        x: position.x,
        y: position.y + 60
      });
      
      // 然后异步加载翻译内容
      const result = await translateText(selectedText);
      
      if (result) {
        setTranslatedText(result);
      } else {
        setTranslatedText('翻译失败，请重试');
      }
    }
  }, [selectedText, translateText, position]);

  // 监听文本选择
  useEffect(() => {
    // 预加载语音列表
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
    
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('touchend', handleTextSelection);
    
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('touchend', handleTextSelection);
      stopReading();
    };
  }, [handleTextSelection, stopReading]);

  // 拖拽功能
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - translationPosition.x,
      y: e.clientY - translationPosition.y
    });
  }, [translationPosition]);

  const handleDragMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      setTranslationPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  }, [isDragging, dragOffset]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 监听拖拽事件
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleDragMove, handleDragEnd]);



  return (
    <>
      {/* 选中文本后的浮动菜单 */}
      {showMenu && (
        <div
          className={styles.menu}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <button
            className={styles.menuButton}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRead();
            }}
            title="朗读选中文本"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <span>朗读</span>
          </button>
          
          <button
            className={styles.menuButton}
            onClick={handleTranslateAndRead}
            title="翻译并朗读"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
            <span>翻译</span>
          </button>
          
          {isReading && (
            <button
              className={`${styles.menuButton} ${styles.stopButton}`}
              onClick={stopReading}
              title="停止朗读"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h12v12H6z"/>
              </svg>
              <span>停止</span>
            </button>
          )}
        </div>
      )}

      {/* 翻译结果显示 */}
      {showTranslation && translatedText && (
        <div
          className={styles.translationBox}
          style={{
            left: `${translationPosition.x}px`,
            top: `${translationPosition.y}px`,
            cursor: isDragging ? 'grabbing' : 'default'
          }}
        >
          <div 
            className={styles.translationHeader}
            onMouseDown={handleDragStart}
            style={{ cursor: 'grab' }}
          >
            <span>翻译结果</span>
            <button
              className={styles.closeButton}
              onClick={(e) => {
                e.stopPropagation();
                setShowTranslation(false);
              }}
              title="关闭"
            >
              ×
            </button>
          </div>
          <div className={styles.translationContent}>
            <div className={styles.originalText}>
              <div className={styles.textHeader}>
                <strong>原文：</strong>
                <button
                  className={styles.speakButton}
                  onClick={() => speakText(selectedText)}
                  title="朗读原文"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                </button>
              </div>
              <p>{selectedText}</p>
            </div>
            <div className={styles.translatedText}>
              <div className={styles.textHeader}>
                <strong>译文：</strong>
                <button
                  className={styles.speakButton}
                  onClick={() => speakText(translatedText)}
                  title="朗读译文"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                </button>
              </div>
              <p>{translatedText}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TextReader;
