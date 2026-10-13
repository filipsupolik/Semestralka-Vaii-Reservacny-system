import { Button } from "@mui/material";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function ImagePicker({
  inputId,
  preview,
  onFileSelect,
  onError,
  buttonLabel = "Choose Image",
  previewWrapperClassName = "mt-4",
  previewClassName = "h-32 w-32 rounded-full object-cover",
}) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onError?.("Please select an image file");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      onError?.("Image must be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => onFileSelect(file, reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        accept="image/*"
        type="file"
        id={inputId}
        onChange={handleChange}
        className="hidden"
      />
      <label htmlFor={inputId}>
        <Button variant="outlined" component="span" fullWidth>
          {buttonLabel}
        </Button>
      </label>
      {preview && (
        <div className={previewWrapperClassName}>
          <img src={preview} alt="Preview" className={previewClassName} />
        </div>
      )}
    </>
  );
}

export default ImagePicker;
