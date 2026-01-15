import DOMPurify from 'dompurify';

/**
 * Sanitizes an HTML string while allowing specific tags and attributes.
 */
export const useSanitize = () => {
    const sanitizeHTML = (html: string) => {
        if (!html) return '';

        // Configure DOMPurify with stricter options
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['p', 'b', 'i', 'u', 'a', 'br', 'em', 'strong'],
            ALLOWED_ATTR: ['href', 'target', 'rel'],
            ALLOW_DATA_ATTR: false,
            SANITIZE_DOM: true,
            WHOLE_DOCUMENT: false,
            FORBID_TAGS: ['script', 'style', 'iframe', 'form'],
            FORBID_ATTR: ['onerror', 'onload', 'onclick']
        });
    };

    const sanitizeUrl = (url: string): string => {
        try {
            const parsed = new URL(url, window.location.origin);
            // Only allow specific protocols
            if (!['http:', 'https:'].includes(parsed.protocol)) {
                return '';
            }
            return parsed.toString();
        } catch {
            return '';
        }
    };

    return {
        sanitizeHTML,
        sanitizeUrl
    };
};
