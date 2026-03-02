class progressBar {

    static step(state) {

        const states = [
            { id: "step_inicio", state: 0 },
            { id: "step_dois", state: 2 }
        ];

        states.forEach(element => {

            if (element.state === state) {

                const current = $(`#${element.id}`);
                current.addClass("current-item");

                const prevs = current.prevAll();

                prevs.each(function () {
                    $(this).addClass("past-item");

                    const iElement = $(this).find("span i");

                    const imgElement = $("<img>", {
                        src: "checked.svg",
                        alt: "Concluído",
                        width: 16,
                        height: 16
                    });

                    iElement.replaceWith(imgElement);
                });

            }

        });

    }

}