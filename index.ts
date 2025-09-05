import ModuleInfo from "./module.json" assert { type: "json" };

console.debug("og-custom-paused-icon: module loading...", ModuleInfo);

//og-custom-paused-icon
export class CustomPausedIcon extends og.BaseModule {
    public override initialize(): void {
        console.debug("og-custom-paused-icon: initializing...");

        // var me = this;
        // Hooks.once("ready", async function () {
        //     console.debug("og-custom-paused-icon: hooks-ready");
        //     me.updateIcon(document);
        // });
        // Hooks.on(
        //     "renderPause",
        //     async function (pauseLayer: any, html: any, data: any) {
        //         console.debug("og-custom-paused-icon: hooks-renderPause");
        //         me.updateIcon(html[0]);
        //     }
        // );
        this.hooks.on(
            "renderPause",
            (pauseLayer: any, html: any, data: any) => {
                console.debug("og-custom-paused-icon: hooks-renderPause");
                this.updateIcon(html[0]);
            }
        );
        this.hooks.on("ready", () => {
            console.debug("og-custom-paused-icon: hooks-ready");
            this.updateIcon(document);
        });
        console.debug("og-custom-paused-icon: initialized");
    }

    updateIcon(el: any) {
        console.debug("og-custom-paused-icon: updateIcon");
        const pauseIcon = el.querySelector("#paused img");
        if (pauseIcon) {
            //@ts-ignore
            pauseIcon.src = `modules/${this.id}/og-paused-icon-128x128.webp`;
            this.logDebug("Updated paused icons");
        }
    }
}

// Create an instance of the module and register it with Og Core Library.
og.registerModule(() => new CustomPausedIcon(ModuleInfo));
