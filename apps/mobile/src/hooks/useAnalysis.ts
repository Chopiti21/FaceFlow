import { useState, useCallback } from 'react';
import { analysisService } from '../services/analysisService';
import { FacialAnalysis } from '../types';

export const useAnalysis = () => {
  const [analyses, setAnalyses] = useState<FacialAnalysis[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<FacialAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeFace = useCallback(async (imageUri: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analysisService.analyzeFace(imageUri);
      setCurrentAnalysis(result);
      setAnalyses(prev => [result, ...prev]);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAnalyses = useCallback(async (limit = 50) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analysisService.getAnalyses(limit);
      setAnalyses(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch analyses';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAnalysis = useCallback(async (analysisId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analysisService.getAnalysis(analysisId);
      setCurrentAnalysis(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch analysis';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteAnalysis = useCallback(async (analysisId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await analysisService.deleteAnalysis(analysisId);
      setAnalyses(prev => prev.filter(a => a.id !== analysisId));
      if (currentAnalysis?.id === analysisId) {
        setCurrentAnalysis(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete analysis';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentAnalysis?.id]);

  const getAnalysisStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analysisService.getAnalysisStats();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stats';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTrendAnalysis = useCallback(async (days = 30) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analysisService.getTrendAnalysis(days);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trends';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    analyses,
    currentAnalysis,
    isLoading,
    error,
    analyzeFace,
    getAnalyses,
    getAnalysis,
    deleteAnalysis,
    getAnalysisStats,
    getTrendAnalysis,
  };
};
