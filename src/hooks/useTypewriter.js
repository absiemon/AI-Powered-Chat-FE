
import { useEffect, useRef, useState } from 'react';

const INTERVAL_MS = 15;

/**
 * Number of characters revealed per tick.
 * Keep this small (1-2) for smooth animation; higher values feel choppy.
 */
const CHARS_PER_TICK = 1;

export function useTypewriter(fullText, enabled = true) {
    // When the animation is disabled, we don't store state for it at all;
    // we just hand back the full text and a static isTyping=false.
    const [displayedText, setDisplayedText] = useState(() =>
        enabled ? '' : fullText,
    );
    const [isTyping, setIsTyping] = useState(enabled && fullText.length > 0);

    // Track the current index in a ref so the interval callback can read
    // and update it without triggering re-renders on every tick.
    const indexRef = useRef(0);

    useEffect(() => {
        // Skip animation entirely when disabled.
        if (!enabled) {
            setDisplayedText(fullText);
            setIsTyping(false);
            return undefined;
        }

        // Reset state for a fresh animation whenever the input text changes.
        indexRef.current = 0;
        setDisplayedText('');
        setIsTyping(fullText.length > 0);

        if (!fullText) {
            return undefined;
        }

        const timer = setInterval(() => {
            indexRef.current += CHARS_PER_TICK;

            if (indexRef.current >= fullText.length) {
                setDisplayedText(fullText);
                setIsTyping(false);
                clearInterval(timer);
                return;
            }

            setDisplayedText(fullText.slice(0, indexRef.current));
        }, INTERVAL_MS);

        // Cleanup on unmount or when fullText/enabled changes.
        return () => clearInterval(timer);
    }, [fullText, enabled]);

    return { displayedText, isTyping };
}