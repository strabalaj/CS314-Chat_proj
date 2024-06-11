import { map } from "lodash";

const getAllConvos = async (currentUserToken, setConversations) => {
    try {
        const response = await fetch ("https://cs314-chat-proj-backend.onrender.com/api/chat/history" , {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${currentUserToken}`,
                "Content-type" : "application/json"
            }
        });
        const result = await response.json()
        if(result.message === 'No chats found for the user') {
            setConversations([]);
        }
        else {
            setConversations(result);
        }
    } catch (error) {
        console.log("ERROR", error);
    }
}

const getSearchResults = async (searchKey, setSearchResults, currentUserToken, setLoading) => {
    try {
        const response = await fetch(`https://cs314-chat-proj-backend.onrender.com/api/user?search=${searchKey}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${currentUserToken}`,
                "Content-type" : "application/json"
            }
        });
        const result = await response.json()
        setSearchResults(result);
        setLoading(false);
    } catch (error) {
        console.log("ERROR", error);
    }
}

const createPrivateConversation = async (selectedContactId, currentUserToken, closePanel, setConversations, io) => {
    try{
        const response = await fetch(`https://cs314-chat-proj-backend.onrender.com/api/chat/new_single_chat`, {
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
        const response = await fetch(`https://cs314-chat-proj-backend.onrender.com/api/messages/${chatId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${currentUserToken}`,
                "Content-type" : "application/json"
            }
        });
        const result = await response.json()
        setMessages(result);
    } catch (error) {
        console.log("ERROR", error);
    }
}

const createGroupConversation = async (currentUserToken, groupName, selectedContacts, setConversations, io) => {
    try {
        console.log("array of group users", map(selectedContacts, (contact) => contact._id))
        let selectedUsers = []
        selectedContacts.forEach(contact => {
            selectedUsers.push(`\"${contact._id}\"`);
        });

        const response = await fetch(`https://cs314-chat-proj-backend.onrender.com/api/chat/new_group_chat`, {
            method: "POST",
            body: JSON.stringify({
                name: groupName,
                users: "[" + selectedUsers.join(", ") + "]"
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

const createMessage = async (messageContent, chatId, currentUserToken, io) => {
    try {
        const response = await fetch(`https://cs314-chat-proj-backend.onrender.com/api/messages/send_message`, {
            method: "POST",
            body: JSON.stringify({
                message_content: messageContent,
                chatID: chatId
            }),
            headers: {
                "Authorization": `Bearer ${currentUserToken}`,
                "Content-type" : "application/json"
            }
        })
        const result = await response.json()
        io.emit("chat_message", result);
    } catch (error) {
        console.log("ERROR", error);
    }

}

const removeConversation = async (chatId, currentUserToken, setConversations) => {
    try{
        const response = await fetch(`https://cs314-chat-proj-backend.onrender.com/api/chat/delete_chat`, {
            method: "DELETE",
            body: JSON.stringify({
                chatID: chatId
            }),
            headers: {
                "Authorization": `Bearer ${currentUserToken}`,
                "Content-type" : "application/json"
            }
        })
        const result = await response.json()
        getAllConvos(currentUserToken, setConversations);
    } catch (error) {
        console.log("ERROR", error);
    }
}
export {getAllConvos, getSearchResults, createPrivateConversation, getMessageHistory, createGroupConversation, createMessage, removeConversation}
