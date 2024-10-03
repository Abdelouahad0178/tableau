document.addEventListener('DOMContentLoaded', (event) => {
    let draggedItem = null;

    // Pour chaque outil, ajoutez la fonctionnalité de drag
    document.querySelectorAll('.tool').forEach(tool => {
        tool.addEventListener('dragstart', (e) => {
            draggedItem = e.target.id;  // Enregistrez l'élément qui est traîné
        });
    });

    const canvas = document.getElementById('canvas');

    // Permet au canvas de recevoir les éléments
    canvas.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    canvas.addEventListener('drop', (e) => {
        e.preventDefault();

        // Ajoutez du texte ou une image selon l'élément glissé
        if (draggedItem === 'textTool') {
            const textElement = document.createElement('div');
            textElement.className = 'draggable';
            textElement.contentEditable = true;  // Permet la modification du texte
            textElement.innerText = 'Texte ici';
            textElement.style.position = 'absolute';
            textElement.style.left = `${e.clientX - canvas.offsetLeft}px`;
            textElement.style.top = `${e.clientY - canvas.offsetTop}px`;
            canvas.appendChild(textElement);
        } else if (draggedItem === 'imageTool') {
            const imgElement = document.createElement('img');
            imgElement.className = 'draggable';
            imgElement.src = 'https://via.placeholder.com/100';  // Exemple d'image par défaut
            imgElement.style.position = 'absolute';
            imgElement.style.left = `${e.clientX - canvas.offsetLeft}px`;
            imgElement.style.top = `${e.clientY - canvas.offsetTop}px`;
            canvas.appendChild(imgElement);
        }

        // Fonction pour permettre le déplacement des éléments une fois déposés
        document.querySelectorAll('.draggable').forEach(el => {
            let isDragging = false;
            let offsetX, offsetY;

            el.addEventListener('mousedown', (e) => {
                isDragging = true;
                offsetX = e.clientX - el.getBoundingClientRect().left;
                offsetY = e.clientY - el.getBoundingClientRect().top;
            });

            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    el.style.left = `${e.clientX - offsetX}px`;
                    el.style.top = `${e.clientY - offsetY}px`;
                }
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        });
    });

    // Ajoutez la fonctionnalité de chargement d'image personnalisée
    document.getElementById('imageTool').addEventListener('click', () => {
        const fileInput = document.getElementById('imageUploader');
        fileInput.click();  // Ouvre le sélecteur de fichiers pour télécharger une image
    });

    document.getElementById('imageUploader').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imgElement = document.createElement('img');
                imgElement.className = 'draggable';
                imgElement.src = event.target.result;
                imgElement.style.position = 'absolute';
                imgElement.style.left = '10px';
                imgElement.style.top = '10px';
                canvas.appendChild(imgElement);

                // Permettre le déplacement de l'image chargée
                imgElement.addEventListener('mousedown', (e) => {
                    let isDragging = true;
                    let offsetX = e.clientX - imgElement.getBoundingClientRect().left;
                    let offsetY = e.clientY - imgElement.getBoundingClientRect().top;

                    document.addEventListener('mousemove', (e) => {
                        if (isDragging) {
                            imgElement.style.left = `${e.clientX - offsetX}px`;
                            imgElement.style.top = `${e.clientY - offsetY}px`;
                        }
                    });

                    document.addEventListener('mouseup', () => {
                        isDragging = false;
                    });
                });
            };
            reader.readAsDataURL(file);
        }
    });
});


function showTextEditorToolbar() {
    if (selectedElement.tagName === 'DIV' || selectedElement.tagName === 'TEXTAREA') {
        textEditorToolbar.style.display = 'block';
        textEditorToolbar.style.left = `${selectedElement.getBoundingClientRect().left}px`;
        textEditorToolbar.style.top = `${selectedElement.getBoundingClientRect().top - 50}px`;
        textEditorToolbar.style.marginBottom = '20px'; // Ajouter une marge en bas via JS
    } else {
        textEditorToolbar.style.display = 'none';
    }
}
