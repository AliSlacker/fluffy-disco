/** @module services/router */

/**
 * all the routing in the frontend will be handled by this object.
 * @namespace
 * @property {method} init - initialize the router see {@link module:services/router~init init}
 * @property {method} go - create page for url without requesting to server see {@link module:services/router~go go}
 */
const router ={

    /**
     * <p>this method initializes the router.</p>
     * <p>router.go(location.pathname) will ensure that the initial URL is checked. for example the user directly enters the url "site/client/add" into browser.
     * the request first will go to the server. server responds with index.html then router gets initialized. but instead of showing the main page we show the page for the initial URL "site/client/add".  </p>
     * <p>set every link to call the router.go() function when clicked.</p>
     * the router will handle history navigation by listening to popstate event.
     * @function init
     */
    init: () => {

        router.go(location.pathname);

        document.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", event => {
                event.preventDefault();
                const href = event.target.getAttribute("href");
                router.go(href);
            })
        })

        window.addEventListener("popstate", event => {
            router.go(event.state.route, false);
        })
    },

    /**
     * <p>This method is responsible for showing the correct page for different URLs</p>
     * <p>if previous page was scrolled the new page scroll is set to beginning</p>
     * <p>if page is not found will show 404</p>
     * @function go
     * @param route {string} - Requested URL String
     * @param addToHistory {boolean} - Add to the pages visited or not. See {@link https://developer.mozilla.org/en-US/docs/Web/API/History history}.  By default it's set to true.
     */
    go: (route , addToHistory = true) =>{

        if(addToHistory){
            history.pushState({route},null,route);
        }

        let pageFound = false; 
        switch (route) {
            case "/client":
                pageFound = true;
                _app.elements.contactList.parentElement.hidden = false;
                _app.elements.editForm.hidden = true;
                _app.elements.insertForm.hidden = true;
                _app.elements.pageNotFound.hidden = true;
                break;
            case "/client/add":
                pageFound = true;
                _app.elements.insertForm.hidden = false;
                _app.elements.editForm.hidden = true;
                _app.elements.contactList.parentElement.hidden = true;
                _app.elements.pageNotFound.hidden = true;
                break;
            default:
                if( new RegExp("^/client/edit/\\d+$").test(route)){
                    pageFound = true;
                    _app.elements.editForm.hidden = false;
                    _app.elements.insertForm.hidden = true;
                    _app.elements.contactList.parentElement.hidden = true;
                    _app.elements.pageNotFound.hidden = true;
                }
                break;
        }

        if (pageFound){
            window.scrollX = 0;
            window.scrollY = 0;
        }
        else{
            _app.elements.form.hidden = true;
            _app.elements.contactList.parentElement.hidden = true;
            _app.elements.pageNotFound.hidden = false;
        }
    }
}

export default router;