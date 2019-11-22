function getTicketData(issue, token, sessionId) {
    url_ticket = 'https://signe.gruposancorseguros.com/rest/api/latest/issue/' + issue;
    cookie_header = 'atlassian.xsrf.token=' + token + '; JSESSIONID=' + sessionId;

    // Request 
    Logger.log(url_ticket);
    resp_fetch = UrlFetchApp.fetch(
        url_ticket, {
            method: 'get',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'cookie': cookie_header
            }
        }
    )
    resp_text = resp_fetch.getContentText();
    return JSON.parse(resp_text);
}

// Nombre del responsable del ticket
function getName(issue, token, sessionId) {
    return getTicketData(issue, token, sessionId).fields.assignee.name + ' ' + '(' + getTicketData(issue, token, sessionId).fields.assignee.displayName + ')';
}

// Tiempo estimado original
function getOriginalEstimate(issue, token, sessionId) {
    ticket_data = getTicketData(issue, token, sessionId).fields.timetracking.originalEstimate
    if( ticket_data != null) return ticket_data.slice(0, -1);
}

// Tiempo consumido
function getTimeSpent(issue, token, sessionId) {
    return getTicketData(issue, token, sessionId).fields.timetracking.timeSpent;
}

// Estado del ticket
function getStatus(issue, token, sessionId) {
    return getTicketData(issue, token, sessionId).fields.status.name;
}

// Etiquetas
function getLabels(issue, token, sessionId) {
    return getTicketData(issue, token, sessionId).fields.labels;
}

// Description
function getDescription(issue, token, sessionId) {
    return getTicketData(issue, token, sessionId).fields.description;
}

// Nombre del ticket
function getSummary(issue, token, sessionId) {
    return getTicketData(issue, token, sessionId).fields.summary;
}

// Que tipo de ticket es
function getIssueType(issue, token, sessionId) {
    return getTicketData(issue, token, sessionId).fields.issuetype.name;
}

// Tarea GW
function getGwTask(issue, token, sessionId) {
    return getTicketData(issue, token, sessionId).fields.customfield_13000.value;
}


// Epica relacionada en la HU no se si esta en todas las HU (No es confiable, no siempre asigna la epica al primer link)
// function getEpicKey2fromHu(issue, token, sessionId){
//     return getTicketData(issue, token, sessionId).fields.issuelinks.outwardIssue.fields.summary
// }

// HU tienen Epicas pero no son padre sin custom link. No se si esta en todas las HU (probe en 2 y esta con ese nombre)
function getEpicKeyFromHu(issue, token, sessionId) {
    return getTicketData(issue, token, sessionId).fields.customfield_10101
}

// Padre directo (aplica a las subtareas, las HU no tienen padre) trae la key de la HU
function getHuKeyFromSubtask(issue, token, sessionId) {
    return getTicketData(issue, token, sessionId).fields.parent.key
}

function getHU(issue, token, sessionId) {
    resp = getTicketData(issue, token, sessionId); 
    if(resp.fields.issuetype.name === "Subtarea") {
        return getHuKeyFromSubtask(issue, token, sessionId)
    } else return issue
}
