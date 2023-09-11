"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wretch_1 = __importDefault(require("wretch"));
/**
 * FireAPI - A simple wrapper for the 24Fire API
 */
class FireAPI {
    /**
     * The API key used for the requests
     */
    apiKey;
    /**
     * @param apiKey The API key used for the requests
     */
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    additional() {
        /**
         * @returns All available operating systems
         */
        function os_list() {
            return ["debian_11", "debian_12", "ubuntu_22_10", "ubuntu_22_04", "centos_7", "windows_server_2019"];
        }
        /**
         * @returns All available hosts
         */
        function hostname_list() {
            return ["nl_ryzen", "nl_xeon"];
        }
        /**
         * @returns All available ISOs
         */
        function iso_list() {
            return [
                "3cx_debian_10.",
                "arch_linux_23_08",
                "centos_7",
                "centos_9",
                "fedora_38",
                "proxmox_8",
                "proxmox_backup_server_3",
                "rocky_linux_9",
                "system_rescue_cd",
            ];
        }
        /**
         * @returns All functions from above
         */
        return {
            os_list,
            hostname_list,
            iso_list,
        };
    }
    /**
     * @returns All available list endpoints
     */
    list() {
        const apiKey = this.apiKey;
        /**
         * @returns All available VMs
         */
        async function vm() {
            return await (0, wretch_1.default)("https://live.fireapi.de/vm/list")
                .headers({
                AUTHORIZATION: "Bearer " + apiKey,
            })
                .get()
                .json();
        }
        /**
         * @returns All available hosts
         */
        async function hosts() {
            return await (0, wretch_1.default)("https://live.fireapi.de/vm/list/hosts")
                .headers({
                AUTHORIZATION: "Bearer " + apiKey,
            })
                .get()
                .json();
        }
        /**
         * @returns All available operating systems
         */
        async function os() {
            return await (0, wretch_1.default)("https://live.fireapi.de/vm/list/os")
                .headers({
                AUTHORIZATION: "Bearer " + apiKey,
            })
                .get()
                .json();
        }
        /**
         * @returns All available ISOs
         */
        async function iso() {
            return await (0, wretch_1.default)("https://live.fireapi.de/vm/list/iso")
                .headers({
                AUTHORIZATION: "Bearer " + apiKey,
            })
                .get()
                .json();
        }
        /**
         * @returns All functions from anbove
         */
        return {
            vm,
            hosts,
            os,
            iso,
        };
    }
    /**
     *
     * @param vmid The ID of the VM
     * @returns All available endpoints for DDoS protection
     */
    ddos(vmid) {
        const apiKey = this.apiKey;
        /**
         * @returns The current DDoS protection
         */
        async function get() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/ddos/`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        /**
         * @param layer4 The layer 4 DDoS protection
         * @param layer7 The layer 7 DDoS protection
         * @param ip_address The IP address for the DDoS protection
         * @returns The edited DDoS protection
         */
        async function edit(layer4, layer7, ip_address) {
            /**
             * If no parameter is given, return
             */
            if (!layer4 && !layer7 && !ip_address) {
                return;
            }
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/ddos/`)
                .headers({ AUTHORIZATION: apiKey })
                .post({
                layer4,
                layer7,
                ip_address,
            })
                .json();
        }
        /**
         * @returns All functions from above
         */
        return {
            get,
            edit,
        };
    }
    /**
     * @param vmid The ID of the VM
     * @returns All available endpoints for backup management
     */
    backup(vmid) {
        const apiKey = this.apiKey;
        /**
         * @returns All available backups
         */
        async function get() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/backup/list`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        /**
         * @returns The created backup
         */
        async function create() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/backup/create`).headers({ AUTHORIZATION: apiKey }).post().json();
        }
        /**
         * @param backup_id The ID of the backup
         * @returns The status of the backup creation
         */
        async function create_status(backup_id) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/backup/create/status`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                backup_id,
            })
                .get()
                .json();
        }
        /**
         * @param backup_id The ID of the backup
         * @returns The restored backup
         */
        async function restore(backup_id) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/backup/restore`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                backup_id,
            })
                .post()
                .json();
        }
        /**
         * @param backup_id The ID of the backup
         * @returns The status of the backup restoration
         */
        async function restore_status(backup_id) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/backup/restore/status`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                backup_id,
            })
                .get()
                .json();
        }
        /**
         * @param backup_id The ID of the backup
         * @returns The JSON Response
         */
        async function remove(backup_id) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/backup/delete`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                backup_id,
            })
                .post()
                .json();
        }
        /**
         * @returns All functions from above
         */
        return {
            get,
            create,
            create_status,
            restore,
            restore_status,
            remove,
        };
    }
    /**
     * @param vmid The ID of the VM
     * @returns All available endpoints for ISO management
     */
    iso(vmid) {
        const apiKey = this.apiKey;
        /**
         * @param iso The ISO to attach
         * @returns The JSON Response
         */
        async function attach(iso) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/iso/`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                iso,
            })
                .put()
                .json();
        }
        /**
         * @returns The JSON Response
         */
        async function detach() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/iso/`).headers({ AUTHORIZATION: apiKey }).delete().json();
        }
        /**
         * @returns All functions from above
         */
        return {
            attach,
            detach,
        };
    }
    /**
     * @returns All available endpoints for the VM
     */
    vm() {
        const apiKey = this.apiKey;
        /**
         * @param vmid The ID of the VM
         * @param os The OS to reinstall
         * @returns The JSON Response
         */
        async function reinstall(vmid, os) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/reinstall`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                os,
            })
                .post()
                .json();
        }
        /**
         * @param cores The amount of cores
         * @param mem The amount of memory
         * @param disk The amount of disk space
         * @param os The OS to install
         * @param hostsystem The host system
         * @param ips The amount of IPs
         * @param backup_slots The amount of backup slots
         * @param network_speed The network speed
         * @returns The created VM
         */
        async function create(cores, mem, disk, os, hostsystem, ips, backup_slots, network_speed) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/create`)
                .body({
                cores,
                mem,
                disk,
                os,
                hostsystem,
                ips,
                backup_slots,
                network_speed,
            })
                .put()
                .json();
        }
        /**
         * @param vmid The ID of the VM
         * @returns All available endpoints for the VM config
         */
        async function config(vmid) {
            /**
             * @returns The VM config
             */
            async function get() {
                return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/config`).headers({ AUTHORIZATION: apiKey }).get().json();
            }
            /**
             * @param cores The amount of cores
             * @param mem The amount of memory
             * @param disk The amount of disk space
             * @param backup_slots The amount of backup slots
             * @param network_speed The network speed
             * @returns The edited VM config
             */
            async function edit(cores, mem, disk, backup_slots, network_speed) {
                /**
                 * If no parameter is given, return
                 */
                if (!cores && !mem && !disk && !backup_slots && !network_speed) {
                    return;
                }
                return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/change`)
                    .headers({ AUTHORIZATION: apiKey })
                    .body({
                    cores,
                    mem,
                    disk,
                    backup_slots,
                    network_speed,
                })
                    .post()
                    .json();
            }
            /**
             * @returns All functions from above
             */
            return {
                get,
                edit,
            };
        }
        /**
         * @param vmid The ID of the VM
         * @param domain The domain for the rDNS
         * @param ip_address The IP address for the rDNS
         * @returns The JSON Response
         */
        async function rdns(vmid, domain, ip_address) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/rdns`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                domain,
                ip_address,
            })
                .post()
                .json();
        }
        /**
         * @param vmid The ID of the VM
         * @returns The JSON Response with link to the noVNC
         */
        async function noVNC(vmid) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/novnc`).headers({ AUTHORIZATION: apiKey }).post().json();
        }
        /**
         * @param vmid The ID of the VM
         * @returns The JSON Response
         */
        async function remove(vmid) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/delete`).headers({ AUTHORIZATION: apiKey }).delete().json();
        }
        /**
         * @param vmid The ID of the VM
         * @returns The Status of the VM
         */
        async function status(vmid) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/status`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        /**
         * @param vmid The ID of the VM
         * @returns The Status of the VM installation
         */
        async function status_installation(vmid) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/status/installation`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        /**
         * @param vmid The ID of the VM
         * @returns The JSON Response with the new password
         */
        async function reset_password(vmid) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/password-reset`).headers({ AUTHORIZATION: apiKey }).post().json();
        }
        /**
         * @param vmid The ID of the VM
         * @param mode The mode to power the VM
         * @returns The JSON Response
         */
        async function power(vmid, mode) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/power`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                mode,
            })
                .post()
                .json();
        }
        /**
         * @returns All functions from above
         */
        return {
            reinstall,
            create,
            config,
            rdns,
            noVNC,
            remove,
            status,
            status_installation,
            reset_password,
            power,
        };
    }
    /**
     * @returns All available endpoints for your account
     */
    account() {
        const apiKey = this.apiKey;
        /**
         * @returns All requests
         */
        async function requests(offset) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/account/requests`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                offset,
            })
                .get()
                .json();
        }
        /**
         * @returns All functions from above
         */
        return {
            requests,
        };
    }
    /**
     * @returns All available endpoints for your accounting
     */
    accounting() {
        const apiKey = this.apiKey;
        /**
         * @returns All invoices
         */
        async function invoices() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/accounting/invoices`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        /**
         * @param invoice_id The ID of the invoice
         * @returns The invoice
         */
        async function invoice(invoice_id) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/accounting/invoices/${invoice_id}`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        /**
         * @returns The current invoice
         */
        async function invoice_current() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/accounting/invoices/current`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        /**
         * @returns All pricings
         */
        async function pricing() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/accounting/pricings`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        /**
         * @returns All functions from above
         */
        return {
            invoices,
            invoice,
            invoice_current,
            pricing,
        };
    }
}
exports.default = FireAPI;
