import { useState, useRef, useCallback } from 'react';
import { CameraView } from 'expo-camera';

export interface CameraImage {
  uri: string;
  width: number;
  height: number;
  type: 'photo';
}

export const useFacialCamera = () => {
  const cameraRef = useRef<CameraView>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPhoto, setLastPhoto] = useState<CameraImage | null>(null);

  const handleCameraReady = useCallback(() => {
    setIsCameraReady(true);
  }, []);

  const takePicture = useCallback(async (): Promise<CameraImage | null> => {
    if (!cameraRef.current || !isCameraReady) {
      setError('Camera is not ready');
      return null;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        skipProcessing: false,
      });

      if (photo) {
        const cameraImage: CameraImage = {
          uri: photo.uri,
          width: photo.width,
          height: photo.height,
          type: 'photo',
        };
        setLastPhoto(cameraImage);
        return cameraImage;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to take picture';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }

    return null;
  }, [isCameraReady]);

  const resetCamera = useCallback(() => {
    setLastPhoto(null);
    setError(null);
  }, []);

  return {
    cameraRef,
    isCameraReady,
    isProcessing,
    error,
    lastPhoto,
    handleCameraReady,
    takePicture,
    resetCamera,
  };
};
