url_confluence_api = 'https://signecon.gruposancorseguros.com/rest/api/content/'

function getConfluencePage(
    confluence_username,
    confluence_password,
    page_key 
){
    url_confluence_api + page_key;
    Logger.log(url_ticket);
    resp_fetch = UrlFetchApp.fetch(
        url_confluence_api, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Basic " + btoa(confluence_username+ ":" + confluence_password)
            },
            type:"page",
            title:"new page", 
            space:{
                key:"LDC",
                name: "Canales"
            },
            body:{
                "storage": {
                    "value":"<p>This is <br/> a new page</p>",
                    "representation": "storage"
                }
            }
        }
    )
}

function createConfluencePage(
    confluence_username,
    confluence_password,
    key, 
    space_name,
    page_title,
    ancestor
){
    url_confluence_api + page_key;
    resp_fetch = UrlFetchApp.fetch(
        url_confluence_api, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': "Basic " + btoa(confluence_username+ ":" + confluence_password)
            },
            // Shape and Name
            type:"page",
            title: page_title, 
            // Location
            space:{
                key: key,
                name: space_name,
                type: "global"
            },
            ancestors:[
                {"id": ancestor} // Padre del issue
            ],
            // Page Content
            body:{
                "storage": {
                    "value":"<p>This is <br/> a new page</p>",
                    "representation": "storage"
                }
            }
        }
    )
}