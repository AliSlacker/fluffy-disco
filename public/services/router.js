const router ={
    // initialize project to work with this router
    init: () => {

        //check the initial URL
        router.go(location.pathname);

        //change a elements default behavior
        document.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", event => {
                event.preventDefault();
                const href = event.target.getAttribute("href");
                Router.go(href);
            })
        })
        //respond to url changes
        window.addEventListener("popstate", event => {
            router.go(event.state.route, false);
        })
    },
    // create page for url client side
    go: (route , addToHistory = true) =>{

        if(addToHistory){
            history.pushState({route},null,route);
        }

        let pageFound = false; // true if requested url is valid
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
            default:
                if( new RegExp("^/client/edit/\\d+$").test(route)){
                    pageFound = true;
                    _app.elements.form.hidden = false;
                    _app.elements.contactList.hidden = true;
                    _app.elements.pageNotFound.hidden = true;
                }
                break;
        }

        if (pageFound){
            // return scroll to 0,0 in the new page
            window.scrollX = 0;
            window.scrollY = 0;
        }
        else{
            // show 404
            _app.elements.form.hidden = true;
            _app.elements.contactList.hidden = true;
            _app.elements.pageNotFound.hidden = false;
        }
    }
}

export default router;