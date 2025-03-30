// Create and store an E2EE key using a password
export async function createE2EEKeyAndStoreInLocalStorage(answer: string) {
    const enc = new TextEncoder();
    const passwordKey = await crypto.subtle.importKey(
        "raw",
        enc.encode(answer),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: enc.encode("salt"), // Use a static salt for simplicity 
            iterations: 100000,
            hash: "SHA-256"
        },
        passwordKey,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    const exportedKey = await crypto.subtle.exportKey("raw", key);

    const keyHash = Array.from(new Uint8Array(exportedKey)).map(byte => byte.toString(16).padStart(2, "0")).join("");
    localStorage.setItem("e2eeKey", keyHash);
    return keyHash;
}

// Encrypt data and store the IV along with encrypted data in an object
export async function encryptString(data: string) {
    const keyHash = localStorage.getItem("e2eeKey");
    if (!keyHash) {
        throw new Error("Key not found in localStorage.");
    }

    const enc = new TextEncoder();
    const keyBuffer = new Uint8Array(keyHash.match(/.{2}/g).map(byte => parseInt(byte, 16)));
    const key = await crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-GCM" },
        false,
        ["encrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
    const encryptedData = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        enc.encode(data)
    );

    // Convert the encrypted data to a string (base64 or hex, for example)
    const encryptedArray = new Uint8Array(encryptedData);
    const encryptedMsg = Array.from(encryptedArray).map(byte => byte.toString(16).padStart(2, "0")).join(""); // Convert to hex string

    // Return an object containing both encrypted data and IV
    return {
        data: encryptedMsg,
        iv: Array.from(iv).map(byte => byte.toString(16).padStart(2, "0")).join("") // Convert IV to hex string
    };
}

// Decrypt data using the key from localStorage
export async function decryptString(encryptedObject: {
    data: string,
    iv: any
}) {
    const keyHash = localStorage.getItem("e2eeKey");
    if (!keyHash) {
        throw new Error("Key not found in localStorage.");
    }

    const enc = new TextEncoder();
    const keyBuffer = new Uint8Array(keyHash.match(/.{2}/g).map(byte => parseInt(byte, 16)));
    const key = await crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-GCM" },
        false,
        ["decrypt"]
    );

    // Convert hex strings back to Uint8Array
    const iv = new Uint8Array(encryptedObject.iv.match(/.{2}/g).map(byte => parseInt(byte, 16)));
    const encryptedData = new Uint8Array(encryptedObject.data.match(/.{2}/g).map(byte => parseInt(byte, 16)));

    const decryptedData = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encryptedData
    );

    const dec = new TextDecoder();
    return dec.decode(decryptedData);
}

// Check if the key exists in localStorage
export function checkIfKeyExists() {
    return localStorage.getItem("e2eeKey") !== null;
}
