import ModuleInfo from "./module.json" assert { type: "json" };

console.debug("og-custom-paused-icon: module loading...", ModuleInfo);

//og-custom-paused-icon
export class CustomPausedIcon extends og.BaseModule {
    public override initialize(): void {
        this.logDebug("initializing");
        this.hooks.on("renderGamePause", () => {
            this.logDebug("renderGamePause");
            this.updateIcon(document);
        });
        this.hooks.once("ready", () => {
            this.logDebug("ready");
            this.updateIcon(document);
        });
        this.logDebug("initialized");
    }

    updateIcon(el: any) {
        this.logDebug("Updating paused icon");
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
