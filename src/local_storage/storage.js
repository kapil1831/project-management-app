// functions to interact with the local storage, to fetch, save and sync projects

function storageAvailable(type){
    let storage;
    try{
        storage = window[type];
        const testStr = '__storage_test__';
        storage.setItem(testStr, testStr);
        storage.removeItem(testStr);  
        return true;
    } catch (e) {
        return (
            e instanceof DOMException && 
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        )
    }
}

export async function fetchFromStorage(key){
    if(storageAvailable('localStorage')){
        try{
            const value = localStorage.getItem(key);
            console.log('retrieved value - ',value)

            if(!value){
                localStorage.setItem(key, JSON.stringify([]));
                return [];
            }
            return JSON.parse(value);
        }catch (e){
            return [];
        }
    }else {
        //raise a message to notify no storage available 
        return [];
    }
}

export async function saveToStorage(key, value){
    if(storageAvailable('localStorage')){
        try{
            localStorage.setItem(key, JSON.stringify(value));
            if(!localStorage.getItem(key)){
                return false; // false for unsuccessful operation
            }
            return true; //true, success
        }catch (e){
            return false;
        }
    }else {
        //raise a message to notify no storage available 
        return false;
    }
}

// this can we triggered every 5-10 min or whenever user wants 
export async function syncToStorage(key, value) {
    return await saveToStorage(key, value);
}

export function clearStorage(){
    localStorage.clear();
}



// sample projects entries
// [ 
    //{ 
    //   id : 1,
    //   title: 'project 1',
    //   description : 'quick summary \n \n details',
    //   dueDate :  'Dec 29, 2024',
    //   tasks : []
    // },
    // {
    //   id: 2,
    //   title: 'project 2',
    //   description : 'quick summary \n \n details',
    //   dueDate :  'Dec 29, 2025',
    //   tasks : []
    // },
    // {
    //   id: 3,
    //   title: 'project 3',
    //   description : 'quick summary \n \n details',
    //   dueDate :  'July 29, 2025',
    //   tasks : []
    // }
// ]