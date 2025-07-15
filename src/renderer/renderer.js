document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const uploadBtn = document.getElementById('uploadBtn');
  const status = document.getElementById('status');
  const preview = document.getElementById('preview');
  const gallery = document.getElementById('gallery');

  let API_URL;

  // Wait for API to be ready
  window.electronAPI.onApiPort((event, port) => {
    API_URL = `http://localhost:${port}`;
    console.log('API ready at:', API_URL);
    status.textContent = 'Ready to upload!';
  });

  // Handle file selection preview
  fileInput.addEventListener('change', (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        preview.innerHTML = `<img src="${event.target.result}" style="max-width: 300px;">`;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });

  // Handle upload
  uploadBtn.addEventListener('click', async () => {
    if (!fileInput.files[0]) {
      status.textContent = 'Please select an image first!';
      return;
    }

    if (!API_URL) {
      status.textContent = 'API not ready yet';
      return;
    }

    status.textContent = 'Uploading...';
    
    try {
      const formData = new FormData();
      formData.append('image', fileInput.files[0]);

      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        status.textContent = 'Upload successful!';
        addImageToGallery(result.filename);
      } else {
        status.textContent = 'Upload failed';
      }
    } catch (error) {
      console.error('Upload error:', error);
      status.textContent = `Upload failed: ${error.message}`;
    }
  });

  function addImageToGallery(filename) {
    const img = document.createElement('img');
    img.src = `${API_URL}/api/images/${filename}`;
    img.style.maxWidth = '200px';
    img.style.margin = '10px';
    gallery.appendChild(img);
  }
});