//API services calling code

// Create
export async function createRecord(collection, payload) {
    try {
        var response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        return await response.json()
    }
    catch (error) {
        console.log(error)
    }
}
//if we create any record with images(files) or any other files
export async function createMultipartRecord(collection, payload) {
    try {
        var response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}`, {
            method: "POST",
            headers: {
            },
            body: payload
        })
        return await response.json()
    }
    catch (error) {
        console.log(error)
    }
}

// Get 
export async function getRecord(collection) {
    try {
        var response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        return await response.json()
    }
    catch (error) {
        console.log(error)
    }
}

// Update
export async function updateRecord(collection, payload) {
    try {
        var response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}/${payload.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        return await response.json()
    }
    catch (error) {
        console.log(error)
    }
}
//if we create any record with images 
export async function updateMultipartRecord(collection, payload) {
    try {
        var response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}/${payload.get(id)}`, {
            method: "PUT",
            headers: {
            },
            body: payload
        })
        return await response.json()
    }
    catch (error) {
        console.log(error)
    }
}

// Delete
export async function deleteRecord(collection, payload) {
    try {
        var response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/${collection}/${payload.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }

        })
        return await response.json()
    }
    catch (error) {
        console.log(error)
    }
}
