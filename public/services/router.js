const router ={
    init: () => {
        //check the initial URL
        router.go(location.pathname);

        document.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", event => {
                const url = a.href;
                router.go(url);
            })
        })
    },
    go: (route) =>{
        history.pushState({},null,route);

        let pageFound = false;
        switch (route) {
            case "/client":
                pageFound = true;
                _app.elements.contactList.hidden = false;
                _app.elements.form.hidden = true;
                _app.elements.pageNotFound.hidden = true;
                break;
            case "/client/add":
                pageFound = true;
                _app.elements.form.hidden = false;
                _app.elements.contactList.hidden = true;
                _app.elements.pageNotFound.hidden = true;
                break;
            case "/client/edit":
                pageFound = true;
                _app.elements.form.hidden = false;
                _app.elements.contactList.hidden = true;
                _app.elements.pageNotFound.hidden = true;
                break;
        }

        if (pageFound){
            window.scrollX = 0;
            window.scrollY = 0;
        }
        else{
            _app.elements.form.hidden = true;
            _app.elements.contactList.hidden = true;
            _app.elements.pageNotFound.hidden = false;
        }
    }
}

export default router;