class DeviceUtils {
    /**
     * Retrieves or generates a unique device ID for identifying user data in Firebase.
     * @returns {string} The unique device ID.
     */
    static getDeviceId(): string {
        let deviceId = localStorage.getItem("device_id");
        if (!deviceId) {
            deviceId = crypto.randomUUID();
            localStorage.setItem("device_id", deviceId);
        }
        return deviceId;
    }
}

export default DeviceUtils;
