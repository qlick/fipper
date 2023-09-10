"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wretch_1 = __importDefault(require("wretch"));
class FireWrapper {
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    list() {
        const apiKey = this.apiKey;
        async function vm() {
            return await (0, wretch_1.default)("https://live.fireapi.de/vm/list")
                .headers({
                AUTHORIZATION: "Bearer " + apiKey,
            })
                .get()
                .json();
        }
        async function hosts() {
            return await (0, wretch_1.default)("https://live.fireapi.de/vm/list/hosts")
                .headers({
                AUTHORIZATION: "Bearer " + apiKey,
            })
                .get()
                .json();
        }
        async function os() {
            return await (0, wretch_1.default)("https://live.fireapi.de/vm/list/os")
                .headers({
                AUTHORIZATION: "Bearer " + apiKey,
            })
                .get()
                .json();
        }
        async function iso() {
            return await (0, wretch_1.default)("https://live.fireapi.de/vm/list/iso")
                .headers({
                AUTHORIZATION: "Bearer " + apiKey,
            })
                .get()
                .json();
        }
        return {
            vm,
            hosts,
            os,
            iso,
        };
    }
    ddos(vmid) {
        const apiKey = this.apiKey;
        async function get() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/ddos/`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        async function edit(layer4, layer7, ip_address) {
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
        return {
            get,
            edit,
        };
    }
    backup(vmid) {
        const apiKey = this.apiKey;
        async function get() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/backup/list`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        async function create() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/backup/create`).headers({ AUTHORIZATION: apiKey }).post().json();
        }
        async function create_status(backup_id) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/backup/create/status`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                backup_id,
            })
                .get()
                .json();
        }
        async function restore(backup_id) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/backup/restore`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                backup_id,
            })
                .post()
                .json();
        }
        async function restore_status(backup_id) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/backup/restore/status`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                backup_id,
            })
                .get()
                .json();
        }
        async function remove(backup_id) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/backup/delete`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                backup_id,
            })
                .post()
                .json();
        }
        return {
            get,
            create,
            create_status,
            restore,
            restore_status,
            remove,
        };
    }
    iso(vmid) {
        const apiKey = this.apiKey;
        async function attach(iso) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/iso/`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                iso,
            })
                .put()
                .json();
        }
        async function detach() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/iso/`).headers({ AUTHORIZATION: apiKey }).delete().json();
        }
        return {
            attach,
            detach,
        };
    }
    vm() {
        const apiKey = this.apiKey;
        async function reinstall(vmid, os) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/reinstall`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                os,
            })
                .post()
                .json();
        }
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
        async function config(vmid) {
            async function edit(vmid, cores, mem, disk, backup_slots, network_speed) {
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
            async function get() {
                return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/config`).headers({ AUTHORIZATION: apiKey }).get().json();
            }
            return {
                edit,
                get,
            };
        }
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
        async function noVNC(vmid) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/novnc`).headers({ AUTHORIZATION: apiKey }).post().json();
        }
        async function remove(vmid) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/delete`).headers({ AUTHORIZATION: apiKey }).delete().json();
        }
        async function status(vmid) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/status`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        async function status_installation(vmid) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/status/installation`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        async function reset_password(vmid) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/password-reset`).headers({ AUTHORIZATION: apiKey }).post().json();
        }
        async function power(vmid, mode) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/vm/${vmid}/power`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                mode,
            })
                .post()
                .json();
        }
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
    account() {
        const apiKey = this.apiKey;
        async function requests(offset) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/account/requests`)
                .headers({ AUTHORIZATION: apiKey })
                .body({
                offset,
            })
                .get()
                .json();
        }
        return {
            requests,
        };
    }
    accounting() {
        const apiKey = this.apiKey;
        async function invoices() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/accounting/invoices`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        async function invoice(invoice_id) {
            return await (0, wretch_1.default)(`https://live.fireapi.de/accounting/invoices/${invoice_id}`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        async function invoice_current() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/accounting/invoices/current`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        async function pricing() {
            return await (0, wretch_1.default)(`https://live.fireapi.de/accounting/pricings`).headers({ AUTHORIZATION: apiKey }).get().json();
        }
        return {
            invoices,
            invoice,
            invoice_current,
            pricing,
        };
    }
}
exports.default = FireWrapper;
