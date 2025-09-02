import React, { useState, useRef } from 'react';
import { Upload, Camera, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  title: string;
  description: string;
  acceptedTypes?: string;
  onUpload?: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  title,
  description,
  acceptedTypes = "image/*,.pdf",
  onUpload
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    setUploadStatus('idle');

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus('success');
      onUpload?.(file);
    }, 2000);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const clearFile = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return '🖼️';
    } else if (file.type === 'application/pdf') {
      return '📄';
    }
    return '📁';
  };

  return (
    <div className="farmer-card">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {!uploadedFile ? (
        <div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors hover:border-primary hover:bg-muted/20 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={openFileDialog}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="bg-primary/10 text-primary p-4 rounded-full">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                Drop your file here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports images (JPG, PNG) and PDF files up to 10MB
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="feature-button">
                <Upload className="w-4 h-4" />
                Choose File
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Take Photo
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getFileIcon(uploadedFile)}</span>
              <div>
                <p className="font-medium text-foreground">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {isUploading && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                <span className="text-sm text-muted-foreground">Analyzing image...</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-3/4 transition-all duration-1000"></div>
              </div>
            </div>
          )}

          {uploadStatus === 'success' && (
            <div className="flex items-center gap-2 mb-4 text-leaf-green">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Upload successful! Analysis complete.</span>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="flex items-center gap-2 mb-4 text-destructive">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Upload failed. Please try again.</span>
            </div>
          )}

          {uploadStatus === 'success' && (
            <div className="bg-secondary rounded-lg p-4">
              <h4 className="font-semibold text-secondary-foreground mb-2">Analysis Results:</h4>
              <div className="space-y-2 text-sm">
                <p className="text-secondary-foreground">
                  <strong>Detected Issue:</strong> Early Blight (Tomato)
                </p>
                <p className="text-secondary-foreground">
                  <strong>Confidence:</strong> 85%
                </p>
                <p className="text-secondary-foreground">
                  <strong>Recommendation:</strong> Apply copper-based fungicide, improve air circulation
                </p>
              </div>
              <Button variant="outline" size="sm" className="mt-3">
                View Detailed Report
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-xs text-muted-foreground">
        <p>• For best results, take clear photos in good lighting</p>
        <p>• Include affected plant parts and surrounding area</p>
        <p>• Multiple angles provide better analysis</p>
      </div>
    </div>
  );
};

export default ImageUpload;