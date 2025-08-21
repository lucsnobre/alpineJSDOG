function dogApp() {
    return {
        breeds: [],
        loading: true,
        error: null,
        searchTerm: '',
        selectedBreed: null,
        breedImage: null,
        loadingImage: false,

        // Initialize the app
        init() {
            this.fetchBreeds();
        },

        // Fetch all breeds from the API
        async fetchBreeds() {
            try {
                this.loading = true;
                this.error = null;
                
                const response = await fetch('https://dog.ceo/api/breeds/list/all');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.status !== 'success') {
                    throw new Error('API returned error status');
                }
                
                // Transform the data into a more usable format
                this.breeds = Object.entries(data.message).map(([breed, subBreeds]) => ({
                    name: breed,
                    subBreeds: subBreeds
                }));
                
                this.loading = false;
            } catch (error) {
                console.error('Erro ao buscar raças:', error);
                this.error = `Falha ao carregar raças de cães: ${error.message}`;
                this.loading = false;
            }
        },

        // Computed property for filtered breeds based on search term
        get filteredBreeds() {
            if (!this.searchTerm) {
                return this.breeds;
            }
            
            const searchLower = this.searchTerm.toLowerCase();
            return this.breeds.filter(breed => 
                breed.name.toLowerCase().includes(searchLower) ||
                breed.subBreeds.some(subBreed => 
                    subBreed.toLowerCase().includes(searchLower)
                )
            );
        },

        // Select a breed and show modal with random image
        async selectBreed(breedName) {
            this.selectedBreed = breedName;
            await this.getRandomImage();
        },

        // Get a random image for the selected breed
        async getRandomImage() {
            if (!this.selectedBreed) return;
            
            try {
                this.loadingImage = true;
                this.breedImage = null;
                
                const response = await fetch(`https://dog.ceo/api/breed/${this.selectedBreed}/images/random`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.status !== 'success') {
                    throw new Error('API returned error status');
                }
                
                this.breedImage = data.message;
                this.loadingImage = false;
            } catch (error) {
                console.error('Erro ao buscar imagem da raça:', error);
                this.loadingImage = false;
                // You could show an error message here if needed
            }
        },

        // Close the modal
        closeModal() {
            this.selectedBreed = null;
            this.breedImage = null;
            this.loadingImage = false;
        }
    }
}
