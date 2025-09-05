import ModuleInfo from "./module.json" assert { type: "json" };

console.debug("og-custom-paused-icon: module loading...", ModuleInfo);

//og-custom-paused-icon
export class CustomPausedIcon extends og.BaseModule {
    // private observer: MutationObserver | null = null;

    public override initialize(): void {
        console.debug("og-custom-paused-icon: initializing...");

        // this.setupPausedElementObserver();

        // // Keep the ready hook to initialize when the DOM is ready
        this.hooks.on("renderGamePause", () => {
            console.debug("og-custom-paused-icon: hooks-ready");
            this.updateIcon(document);
        });
        this.hooks.on("ready", () => {
            console.debug("og-custom-paused-icon: hooks-ready");
            this.updateIcon(document);
        });

        // // Add cleanup when the page is about to unload
        // window.addEventListener("beforeunload", () => {
        //     this.cleanup();
        // });

        console.debug("og-custom-paused-icon: initialized");
    }

    // private setupPausedElementObserver(): void {
    //     console.debug(
    //         "og-custom-paused-icon: setting up paused element observer"
    //     );

    //     // Find the #paused element
    //     const pausedElement = document.querySelector("#pause");
    //     if (!pausedElement) {
    //         console.warn(
    //             "og-custom-paused-icon: #pause element not found, retrying in 1 second"
    //         );
    //         setTimeout(() => this.setupPausedElementObserver(), 1000);
    //         return;
    //     }

    //     // Create a MutationObserver to watch for changes
    //     this.observer = new MutationObserver((mutations) => {
    //         let shouldUpdate = false;

    //         mutations.forEach((mutation) => {
    //             // Check for attribute changes (like class, style, or other attributes)
    //             if (mutation.type === "attributes") {
    //                 console.debug(
    //                     "og-custom-paused-icon: #pause attribute changed:",
    //                     mutation.attributeName
    //                 );
    //                 shouldUpdate = true;
    //             }
    //             // Check for child node changes (content being added/removed)
    //             else if (mutation.type === "childList") {
    //                 console.debug(
    //                     "og-custom-paused-icon: #pause children changed"
    //                 );
    //                 shouldUpdate = true;
    //             }
    //         });

    //         if (shouldUpdate) {
    //             console.debug(
    //                 "og-custom-paused-icon: #pause element changed, updating icon"
    //             );
    //             this.updateIcon(document);
    //         }
    //     });

    //     // Start observing the #pause element
    //     this.observer.observe(pausedElement, {
    //         attributes: true, // Watch for attribute changes
    //         childList: true, // Watch for child node changes
    //         subtree: true, // Watch for changes in descendants
    //         attributeOldValue: true, // Include old attribute values in mutation records
    //     });

    //     console.debug("og-custom-paused-icon: observer setup complete");
    // }

    // private cleanup(): void {
    //     console.debug("og-custom-paused-icon: cleaning up");

    //     // Disconnect the observer when cleaning up
    //     if (this.observer) {
    //         this.observer.disconnect();
    //         this.observer = null;
    //     }
    // }

    updateIcon(el: any) {
        console.debug("og-custom-paused-icon: updateIcon");
        const pauseIcon = el.querySelector("#pause img");
        if (pauseIcon) {
            //@ts-ignore
            pauseIcon.src = `modules/${this.id}/og-paused-icon-128x128.webp`;
            this.logDebug("Updated paused icons");
        }
    }
}

// Create an instance of the module and register it with Og Core Library.
og.registerModule(() => new CustomPausedIcon(ModuleInfo));
