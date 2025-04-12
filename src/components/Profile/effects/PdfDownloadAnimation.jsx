import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '../styles/PlaygroundStyles';

const PdfDownloadAnimation = () => {
  const contentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pdfLib, setPdfLib] = useState(null);
  const [html2canvasLib, setHtml2canvasLib] = useState(null);

  // A4 사이즈 상수 (mm 단위)
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;
  
  // 화면에 표시할 때의 스케일 (실제 mm를 px로 변환)
  const SCALE_FACTOR = 3.78; // 1mm = 3.78px (일반적인 96 DPI 기준)
  
  useEffect(() => {
    const loadLibraries = async () => {
      const [jsPDFModule, html2canvasModule] = await Promise.all([
        import('jspdf'),
        import('html2canvas')
      ]);
      setPdfLib(jsPDFModule.default);
      setHtml2canvasLib(html2canvasModule.default);
    };
    
    loadLibraries();
  }, []);

  const handleDownload = async () => {
    if (!contentRef.current || !pdfLib || !html2canvasLib) return;

    setIsLoading(true);
    try {
      const canvas = await html2canvasLib(contentRef.current, {
        scale: 2,
        backgroundColor: '#0a192f',
        width: A4_WIDTH_MM * SCALE_FACTOR,
        height: A4_HEIGHT_MM * SCALE_FACTOR
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new pdfLib({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
      pdf.save('download.pdf');

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('PDF 생성 중 오류:', error);
    }
    setIsLoading(false);
  };

  return (
    <PS.MotionContainer>
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem'
      }}>
        {/* A4 사이즈 컨테이너 */}
        <div style={{
          width: `${A4_WIDTH_MM * SCALE_FACTOR}px`,
          height: `${A4_HEIGHT_MM * SCALE_FACTOR}px`,
          background: '#0a192f',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
          margin: '0 auto 2rem auto',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* 실제 컨텐츠 영역 */}
          <div 
            ref={contentRef}
            style={{
              width: '100%',
              height: '100%',
              padding: '20mm',
              boxSizing: 'border-box'
            }}
          >
            <h2 style={{ 
              color: '#64ffda', 
              marginBottom: '15mm',
              fontSize: '24px'
            }}>
              PDF 다운로드 예시
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10mm',
              marginBottom: '15mm'
            }}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  style={{
                    background: `linear-gradient(135deg, hsl(${item * 90}, 70%, 70%) 0%, rgba(10,25,47,0.8) 100%)`,
                    padding: '10mm',
                    borderRadius: '3mm',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <h3 style={{ color: '#fff', marginBottom: '5mm', fontSize: '18px' }}>
                    섹션 {item}
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', lineHeight: '1.5' }}>
                    이 영역은 PDF로 변환됩니다. A4 용지 크기에 맞춰 정확하게 변환됩니다.
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '10mm',
              borderRadius: '3mm',
              color: '#fff'
            }}>
              <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
                이 예시는 A4 규격(210mm x 297mm)에 맞춰 디자인되었습니다.
                PDF로 변환 시 정확한 비율로 출력됩니다.
              </p>
            </div>

            {/* Made by Junseok 추가 */}
            <div style={{
              position: 'absolute',
              bottom: '10mm',
              right: '20mm',
              color: '#64ffda',
              fontSize: '14px',
              fontStyle: 'italic',
              opacity: 0.8
            }}>
              Made by Junseok
            </div>
          </div>
        </div>

        {/* 다운로드 버튼 */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={isLoading}
          style={{
            background: '#64ffda',
            color: '#0a192f',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            width: `${A4_WIDTH_MM * SCALE_FACTOR}px`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {isLoading ? 'PDF 생성 중...' : 'PDF 다운로드'}
        </motion.button>

        {/* 성공 메시지 */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: 'fixed',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#64ffda',
                color: '#0a192f',
                padding: '1rem 2rem',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(100, 255, 218, 0.3)',
                zIndex: 1000
              }}
            >
              PDF 다운로드 완료!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PS.MotionContainer>
  );
};

export default PdfDownloadAnimation; 