import { map } from "lodash";

const getAllConvos = async (currentUserToken, setConversations) => {
    try {
        const response = await fetch ("http://localhost:5002/api/chat/history" , {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${currentUserToken}`,
                "Content-type" : "application/json"
            }
        });
        const result = await response.json()
        console.log("result", result);
        setConversations(result);
    } catch (error) {
        console.log("ERROR", error);
    }
}

const getSearchResults = async (searchKey, setSearchResults, currentUserToken, setLoading) => {
    try {
        const response = await fetch(`http://localhost:5002/api/user?search=${searchKey}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${currentUserToken}`,
                "Content-type" : "application/json"
            }
        });
        const result = await response.json()
        console.log("Search result", result);
        setSearchResults(result);
        setLoading(false);
    } catch (error) {
        console.log("ERROR", error);
    }
}

const createPrivateConversation = async (selectedContactId, currentUserToken, closePanel, setConversations, io) => {
    try{
        const response = await fetch(`http://localhost:5002/api/chat/new_single_chat`, {
            method: "POST",
            body: JSON.stringify({
                userId: selectedContactId
            }),
            headers: {
                "Authorization": `Bearer ${currentUserToken}`,
                "Content-type" : "application/json"
            }
        })
        const result = await response.json()
        io.emit('create_conversation', result);
        getAllConvos(currentUserToken, setConversations);
        closePanel();
    } catch (error) {
        console.log("ERROR", error);
    }
}

const getMessageHistory = async (chatId, currentUserToken, setMessages) => {
    try {
        const response = await fetch(`http://localhost:5002/api/messages/${chatId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${currentUserToken}`,
                "Content-type" : "application/json"
            }
        });
        const result = await response.json()
        console.log("RESULT FROM MESSAGE HISTORY", result);
        setMessages(result);
    } catch (error) {
        console.log("ERROR", error);
    }
}

const createGroupConversation = async (currentUserToken, groupName, selectedContacts, setConversations, io) => {
    try {
        console.log("array of group users", map(selectedContacts, (contact) => contact._id))
        const response = await fetch(`http://localhost:5002/api/chat/new_group_chat`, {
            method: "POST",
            body: JSON.stringify({
                name: groupName,
                users: map(selectedContacts, (contact) =>  "/" + contact._id + "/" )
            }),
            headers: {
                "Authorization": `Bearer ${currentUserToken}`,
                "Content-type" : "application/json"
            }
        })
        const result = await response.json()
        io.emit('create_conversation', result);
        getAllConvos(currentUserToken, setConversations);
    } catch (error) {
        console.log("ERROR", error);
    }
}
export {getAllConvos, getSearchResults, createPrivateConversation, getMessageHistory, createGroupConversation}
