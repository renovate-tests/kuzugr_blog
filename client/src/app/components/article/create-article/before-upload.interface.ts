export interface UploadMetadata {
  file: File;
  abort: boolean;
  formData?: { [name: string]: any };
}
