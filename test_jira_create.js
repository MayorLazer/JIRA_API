var data = new Object({
    "fields":
    {
        "project":
        {
            "key": "NEOSSA"
        },
        "parent":
        {
            "key": "NEOSSA-43068"
        },
        "summary": "subtask_name",
        "description": "subtask_descrip",
        "timetracking": 
        {
        	"originalEstimate": "0h"
        },
        "priority": 
        {
        	"id": "4"
        },
        "issuetype": 
        {
            "id": "5"
        },
	    "customfield_13000": 
	    {
	    	"id": "18700"
	    },
	    "assignee":
	    {
	    	"name":"smartorell"
	    },
	    "components": 
	    [
			{
				"name": "IntegracionesExternas"
			}
		],
		"duedate": "2019-10-23"
    }
});

url_ticket = 'https://signe.gruposancorseguros.com/rest/api/latest/issue/';
    var resp_fetch = fetch( url_ticket, {
			mode: 'no-cors',
            method: 'POST',
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Basic c21hcnRvcmVsbDpNYXJ0ZXMrMTc=',
			   'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }
    )
