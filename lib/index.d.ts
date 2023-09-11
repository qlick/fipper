export default class FireAPI {
    private readonly apiKey;
    constructor(apiKey: string);
    list(): {
        vm: () => Promise<unknown>;
        hosts: () => Promise<unknown>;
        os: () => Promise<unknown>;
        iso: () => Promise<unknown>;
    };
    ddos(vmid: string): {
        get: () => Promise<unknown>;
        edit: (layer4?: string, layer7?: string, ip_address?: string) => Promise<unknown>;
    };
    backup(vmid: string): {
        get: () => Promise<unknown>;
        create: () => Promise<unknown>;
        create_status: (backup_id: string) => Promise<unknown>;
        restore: (backup_id: string) => Promise<unknown>;
        restore_status: (backup_id: string) => Promise<unknown>;
        remove: (backup_id: string) => Promise<unknown>;
    };
    iso(vmid: string): {
        attach: (iso: "3cx_debian_10." | "arch_linux_23_08" | "centos_7" | "centos_9" | "fedora_38" | "proxmox_8" | "proxmox_backup_server_3" | "rocky_linux_9" | "system_rescue_cd") => Promise<unknown>;
        detach: () => Promise<unknown>;
    };
    vm(): {
        reinstall: (vmid: string, os?: "debian_11" | "debian_12" | "ubuntu_22_10" | "ubuntu_22_04" | "centos_7" | "windows_server_2019") => Promise<unknown>;
        create: (cores: number, mem: number, disk: number, os: "debian_11" | "debian_12" | "ubuntu_22_10" | "ubuntu_22_04" | "centos_7" | "windows_server_2019", hostsystem: "nl_xeon" | "nl_ryzen", ips?: number, backup_slots?: number, network_speed?: number) => Promise<unknown>;
        config: (vmid: string) => Promise<{
            edit: (vmid: string, cores?: number, mem?: number, disk?: number, backup_slots?: number, network_speed?: number) => Promise<unknown>;
            get: () => Promise<unknown>;
        }>;
        rdns: (vmid: string, domain: string, ip_address: string) => Promise<unknown>;
        noVNC: (vmid: string) => Promise<unknown>;
        remove: (vmid: string) => Promise<unknown>;
        status: (vmid: string) => Promise<unknown>;
        status_installation: (vmid: string) => Promise<unknown>;
        reset_password: (vmid: string) => Promise<unknown>;
        power: (vmid: string, mode: "start" | "stop" | "restart") => Promise<unknown>;
    };
    account(): {
        requests: (offset?: number) => Promise<unknown>;
    };
    accounting(): {
        invoices: () => Promise<unknown>;
        invoice: (invoice_id: string) => Promise<unknown>;
        invoice_current: () => Promise<unknown>;
        pricing: () => Promise<unknown>;
    };
}
