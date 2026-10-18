/**
 * Asset loader that tracks actual image decoding and loading completion.
 * Never stalls: failed or timed-out assets are marked as resolved to guarantee entrance handoff.
 */
export interface AssetLoadProgress {
  loaded: number;
  total: number;
  percent: number;
  isComplete: boolean;
}

export function preloadImages(
  urls: string[],
  onProgress?: (progress: AssetLoadProgress) => void,
  timeoutMs = 4000
): Promise<AssetLoadProgress> {
  // Deduplicate and filter valid URLs
  const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
  const total = uniqueUrls.length;

  if (total === 0) {
    const immediate: AssetLoadProgress = { loaded: 0, total: 0, percent: 100, isComplete: true };
    onProgress?.(immediate);
    return Promise.resolve(immediate);
  }

  let loaded = 0;

  return new Promise((resolve) => {
    let resolved = false;

    const checkComplete = () => {
      const percent = Math.min(100, Math.round((loaded / total) * 100));
      const status: AssetLoadProgress = {
        loaded,
        total,
        percent,
        isComplete: loaded >= total,
      };

      onProgress?.(status);

      if (loaded >= total && !resolved) {
        resolved = true;
        resolve(status);
      }
    };

    uniqueUrls.forEach((url) => {
      const img = new Image();
      let completed = false;

      const markDone = () => {
        if (!completed) {
          completed = true;
          loaded += 1;
          checkComplete();
        }
      };

      // Safety timeout per image
      const timer = setTimeout(() => {
        markDone();
      }, timeoutMs);

      img.onload = () => {
        clearTimeout(timer);
        if ('decode' in img && typeof img.decode === 'function') {
          img.decode().then(markDone).catch(markDone);
        } else {
          markDone();
        }
      };

      img.onerror = () => {
        clearTimeout(timer);
        markDone();
      };

      img.src = url;
    });

    // Global fail-safe timeout so loader cannot hang indefinitely
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve({
          loaded: total,
          total,
          percent: 100,
          isComplete: true,
        });
      }
    }, timeoutMs + 1000);
  });
}
