/**
 * FireAPI - A simple wrapper for the 24Fire API
 */
export default class FireAPI {
    /**
     * The API key used for the requests
     */
    private readonly apiKey;
    /**
     * @param apiKey The API key used for the requests
     */
    constructor(apiKey: string);
    additional(): {
        os_list: () => Promise<string[]>;
        hostname_list: () => Promise<string[]>;
        iso_list: () => Promise<string[]>;
    };
    /**
     * @returns All available list endpoints
     */
    list(): {
        vm: () => Promise<unknown>;
        hosts: () => Promise<unknown>;
        os: () => Promise<unknown>;
        iso: () => Promise<unknown>;
    };
    /**
     *
     * @param vmid The ID of the VM
     * @returns All available endpoints for DDoS protection
     */
    ddos(vmid: string): {
        get: () => Promise<unknown>;
        edit: (layer4?: string, layer7?: string, ip_address?: string) => Promise<unknown>;
    };
    /**
     * @param vmid The ID of the VM
     * @returns All available endpoints for backup management
     */
    backup(vmid: string): {
        get: () => Promise<unknown>;
        create: () => Promise<unknown>;
        create_status: (backup_id: string) => Promise<unknown>;
        restore: (backup_id: string) => Promise<unknown>;
        restore_status: (backup_id: string) => Promise<unknown>;
        remove: (backup_id: string) => Promise<unknown>;
    };
    /**
     * @param vmid The ID of the VM
     * @returns All available endpoints for ISO management
     */
    iso(vmid: string): {
        attach: (iso: "3cx_debian_10." | "arch_linux_23_08" | "centos_7" | "centos_9" | "fedora_38" | "proxmox_8" | "proxmox_backup_server_3" | "rocky_linux_9" | "system_rescue_cd") => Promise<unknown>;
        detach: () => Promise<unknown>;
    };
    /**
     * @returns All available endpoints for the VM
     */
    vm(): {
        reinstall: (vmid: string, os?: "debian_11" | "debian_12" | "ubuntu_22_10" | "ubuntu_22_04" | "centos_7" | "windows_server_2019") => Promise<unknown>;
        create: (cores: number, mem: number, disk: number, os: "debian_11" | "debian_12" | "ubuntu_22_10" | "ubuntu_22_04" | "centos_7" | "windows_server_2019", hostsystem: "nl_xeon" | "nl_ryzen", ips?: number, backup_slots?: number, network_speed?: number) => Promise<unknown>;
        config: (vmid: string) => Promise<{
            get: () => Promise<unknown>;
            edit: (cores?: number, mem?: number, disk?: number, backup_slots?: number, network_speed?: number) => Promise<unknown>;
        }>;
        rdns: (vmid: string, domain: string, ip_address: string) => Promise<unknown>;
        noVNC: (vmid: string) => Promise<unknown>;
        remove: (vmid: string) => Promise<unknown>;
        status: (vmid: string) => Promise<unknown>;
        status_installation: (vmid: string) => Promise<unknown>;
        reset_password: (vmid: string) => Promise<unknown>;
        power: (vmid: string, mode: "start" | "stop" | "restart") => Promise<unknown>;
    };
    /**
     * @returns All available endpoints for your account
     */
    account(): {
        requests: (offset?: number) => Promise<unknown>;
    };
    /**
     * @returns All available endpoints for your accounting
     */
    accounting(): {
        invoices: () => Promise<unknown>;
        invoice: (invoice_id: string) => Promise<unknown>;
        invoice_current: () => Promise<unknown>;
        pricing: () => Promise<unknown>;
    };
}
