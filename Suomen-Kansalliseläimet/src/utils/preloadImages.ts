export const preloadImages = (
    iamgeUrls: string[],
    onProgress: (percentage: number) => void
): Promise<Record<string, HTMLImageElement>> => {
    const preloadedImages: Record<string, HTMLImageElement> = {};
    let loadedCount = 0;

    return new Promise((resolve, reject) => {
        iamgeUrls.forEach((url) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedCount++;
                preloadedImages[url] = img;
                onProgress(Math.round((loadedCount / iamgeUrls.length) * 100));
                console.log(`Preloaded image ${url} (${loadedCount}/${iamgeUrls.length})`);

                if (loadedCount === iamgeUrls.length) {
                    resolve(preloadedImages);
                }
            };

            img.onerror = (error) => {
                console.error(`Error preloading image ${url}:`, error);
                reject(error);
            };
        });
    });
}