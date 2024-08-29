const imageModulesMain = import.meta.glob('../imgs/*.{png,jpg,jpeg,svg}', { eager: true });
const imageModulesGameImgs = import.meta.glob('../imgs/gameImgs/*.{png,jpg,jpeg,svg}', { eager: true });
const imageModulesEstimateImgs = import.meta.glob('../imgs/estimateImgs/*.{png,jpg,jpeg,svg}', { eager: true });

const imageModules = { ...imageModulesMain, ...imageModulesGameImgs, ...imageModulesEstimateImgs };

/**
 * Preload images
 * 
 * @returns {Promise<HTMLImageElement[]>} Promise that resolves with an array of loaded images
 */
export const preloadImages = (): Promise<HTMLImageElement[]> => {
    return new Promise((resolve, reject) => {
        const imagePaths = Object.keys(imageModules);
        const images: HTMLImageElement[] = [];
        let loadedImagesCount = 0;
        const totalImages = imagePaths.length;

        if (totalImages === 0) {
            resolve(images);
            return;
        }

        imagePaths.forEach((path, index) => {
            // Create a new image element and set the src to the image path to load it to the browser cache
            const img = new Image();
            img.src = (imageModules[path] as { default: string }).default;

            // When the image is loaded, increment the loaded images count and add the image to the images array
            img.onload = () => {
                loadedImagesCount++;
                images[index] = img;
                if (loadedImagesCount === totalImages) {
                    resolve(images);
                }
            };

            // If the image fails to load, log an error and reject the promise
            img.onerror = (error) => {
                console.error(`Failed to load image at ${path}`, error);
                reject(new Error(`Failed to load image at ${path}`));
            };
        });
    });
};