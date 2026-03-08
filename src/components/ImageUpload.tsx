import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (files: File[]) => void;
  multiple?: boolean;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, multiple = false, label = 'Upload Foto' }) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArr = Array.from(files);
    const urls = fileArr.map(f => URL.createObjectURL(f));
    setPreviews(prev => multiple ? [...prev, ...urls] : urls);
    onImageSelect(fileArr);
  };

  const removePreview = (idx: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-2 block">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('border-primary'); }}
        onDragLeave={e => e.currentTarget.classList.remove('border-primary')}
        onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('border-primary'); handleFiles(e.dataTransfer.files); }}
        className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
      >
        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">Klik atau drag & drop gambar di sini</p>
        <p className="text-xs text-muted-foreground mt-1">JPG, PNG (maks 5MB)</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          multiple={multiple}
          onChange={e => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>
      {previews.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {previews.map((url, idx) => (
            <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border">
              <img src={url} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={(e) => { e.stopPropagation(); removePreview(idx); }}
                className="absolute top-0.5 right-0.5 bg-foreground/60 text-card rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
