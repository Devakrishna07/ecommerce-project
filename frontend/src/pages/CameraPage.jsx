import React, { useState, useRef, useEffect } from 'react';

// Add this function to your CameraApp component

const apicall = () => {
  
}

const hideNavbar = () => {
  // Create a style element
  const style = document.createElement('style');
  
  // CSS to hide common navbar elements
  style.textContent = `
    /* Hide common navbar elements */
    nav, 
    header, 
    .header, 
    .navbar, 
    .nav-bar, 
    .navigation, 
    #header, 
    #navbar, 
    #nav,
    [role="navigation"],
    .app-header,
    .site-header,
    .top-bar,
    .main-header,
    .MuiAppBar-root {
      display: none !important;
    }
    
    /* Ensure body takes full height */
    html, body {
      overflow: hidden;
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }
    
    /* Force our app to take full screen */
    #root, .app {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      z-index: 9999 !important;
    }
  `;
  
  // Add the style element to the document head
  document.head.appendChild(style);
};

const CameraApp = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Initialize camera when component mounts and camera is open
    hideNavbar();
    if (isCameraOpen) {
      openCamera();
    }
    
    // Cleanup function to stop camera when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOpen]);

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check permissions.");
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop(); // Stop each track completely
      });
  
      setStream(null); // Clear stream state
    }
  
    if (videoRef.current) {
      videoRef.current.srcObject = null; // Remove video source
    }
  
    setIsCameraOpen(false); // Close camera UI
  
    // navigate("/"); // Navigate back to homepage
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame on canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image from canvas
      const imageURL = canvas.toDataURL('image/png');
      setCapturedImage(imageURL);
      
      // Close camera after capture
      closeCamera();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target.result);
        setIsCameraOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetApp = () => {
    setCapturedImage(null);
    setIsCameraOpen(true);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // CSS styles
  const styles = {
    app: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    camera: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    closeButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      background: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      fontSize: '20px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    captureButton: {
      position: 'absolute',
      bottom: '30px',
      backgroundColor: 'white',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: '2px solid #ccc',
    },
    captureIcon: {
      width: '30px',
      height: '30px',
    },
    searchIcon: {
      width: '24px',
      height: '24px',
    },
    resultContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    capturedImage: {
      maxWidth: '100%',
      maxHeight: '80%',
      objectFit: 'contain',
    },
    actionBar: {
      position: 'absolute',
      bottom: '30px',
      display: 'flex',
      gap: '20px',
    },
    actionButton: {
      backgroundColor: 'white',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: 'none',
    },
    hidden: {
      display: 'none',
    },
    canvas: {
      display: 'none',
    }
  };

  // SVG Icons
  const CameraIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );

  const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  const GalleryIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );

  return (
    <div style={styles.app}>
      {isCameraOpen ? (
        <div style={styles.camera}>
          <button style={styles.closeButton} onClick={closeCamera}>
            <CloseIcon />
          </button>
          <video
            ref={videoRef}
            style={styles.video}
            autoPlay
            playsInline
          />
          <div style={styles.captureButton} onClick={captureImage}>
            <div style={styles.captureIcon}>
              <CameraIcon />
            </div>
          </div>
        </div>
      ) : capturedImage ? (
        <div style={styles.resultContainer}>
          <button style={styles.closeButton} onClick={resetApp}>
            <CloseIcon />
          </button>
          <img
            src={capturedImage}
            alt="Captured"
            style={styles.capturedImage}
          />
          <div style={styles.actionBar}>
            <button style={styles.actionButton} onClick={triggerFileInput}>
              <div style={styles.searchIcon}>
                <GalleryIcon />
              </div>
            </button>
            <button style={styles.actionButton} onClick={apicall}>
              <div style={styles.searchIcon}>
                <SearchIcon />
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.resultContainer}>
          <button style={styles.closeButton} onClick={closeCamera}>
            <CloseIcon />
          </button>
          <div style={styles.actionBar}>
            <button style={styles.actionButton} onClick={triggerFileInput}>
              <div style={styles.searchIcon}>
                <GalleryIcon />
              </div>
            </button>
            <button style={styles.actionButton} onClick={resetApp}>
              <div style={styles.searchIcon}>
                <CameraIcon />
              </div>
            </button>
          </div>
        </div>
      )}
      
      {/* Hidden elements */}
      <canvas ref={canvasRef} style={styles.canvas} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={styles.hidden}
      />
    </div>
  );
};

export default CameraApp;