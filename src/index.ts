import wretch from "wretch";

export default class FireWrapper {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public list() {
    const apiKey = this.apiKey;
    async function vm() {
      return await wretch("https://live.fireapi.de/vm/list")
        .headers({
          AUTHORIZATION: "Bearer " + apiKey,
        })
        .get()
        .json();
    }
    async function hosts() {
      return await wretch("https://live.fireapi.de/vm/list/hosts")
        .headers({
          AUTHORIZATION: "Bearer " + apiKey,
        })
        .get()
        .json();
    }
    async function os() {
      return await wretch("https://live.fireapi.de/vm/list/os")
        .headers({
          AUTHORIZATION: "Bearer " + apiKey,
        })
        .get()
        .json();
    }
    async function iso() {
      return await wretch("https://live.fireapi.de/vm/list/iso")
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

  public ddos(vmid: string) {
    const apiKey = this.apiKey;

    async function get() {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/ddos/`).headers({AUTHORIZATION: apiKey}).get().json();
    }
    async function edit(layer4?: string, layer7?: string, ip_address?: string) {
      if (!layer4 && !layer7 && !ip_address) {
        return;
      }

      return await wretch(`https://live.fireapi.de/vm/${vmid}/ddos/`)
        .headers({AUTHORIZATION: apiKey})
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

  public backup(vmid: string) {
    const apiKey = this.apiKey;

    async function get() {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/backup/list`).headers({AUTHORIZATION: apiKey}).get().json();
    }
    async function create() {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/backup/create`).headers({AUTHORIZATION: apiKey}).post().json();
    }
    async function create_status(backup_id: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/backup/create/status`)
        .headers({AUTHORIZATION: apiKey})
        .body({
          backup_id,
        })
        .get()
        .json();
    }
    async function restore(backup_id: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/backup/restore`)
        .headers({AUTHORIZATION: apiKey})
        .body({
          backup_id,
        })
        .post()
        .json();
    }
    async function restore_status(backup_id: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/backup/restore/status`)
        .headers({AUTHORIZATION: apiKey})
        .body({
          backup_id,
        })
        .get()
        .json();
    }
    async function remove(backup_id: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/backup/delete`)
        .headers({AUTHORIZATION: apiKey})
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

  public iso(vmid: string) {
    const apiKey = this.apiKey;

    async function attach(iso: "3cx_debian_10." | "arch_linux_23_08" | "centos_7" | "centos_9" | "fedora_38" | "proxmox_8" | "proxmox_backup_server_3" | "rocky_linux_9" | "system_rescue_cd") {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/iso/`)
        .headers({AUTHORIZATION: apiKey})
        .body({
          iso,
        })
        .put()
        .json();
    }
    async function detach() {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/iso/`).headers({AUTHORIZATION: apiKey}).delete().json();
    }

    return {
      attach,
      detach,
    };
  }

  public vm() {
    const apiKey = this.apiKey;

    async function reinstall(vmid: string, os?: "debian_11" | "debian_12" | "ubuntu_22_10" | "ubuntu_22_04" | "centos_7" | "windows_server_2019") {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/reinstall`)
        .headers({AUTHORIZATION: apiKey})
        .body({
          os,
        })
        .post()
        .json();
    }

    async function create(cores: number, mem: number, disk: number, os: "debian_11" | "debian_12" | "ubuntu_22_10" | "ubuntu_22_04" | "centos_7" | "windows_server_2019", hostsystem: "nl_xeon" | "nl_ryzen", ips?: number, backup_slots?: number, network_speed?: number) {
      return await wretch(`https://live.fireapi.de/vm/create`)
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

    async function config(vmid: string) {
      async function edit(vmid: string, cores?: number, mem?: number, disk?: number, backup_slots?: number, network_speed?: number) {
        if (!cores && !mem && !disk && !backup_slots && !network_speed) {
          return;
        }

        return await wretch(`https://live.fireapi.de/vm/${vmid}/change`)
          .headers({AUTHORIZATION: apiKey})
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
        return await wretch(`https://live.fireapi.de/vm/${vmid}/config`).headers({AUTHORIZATION: apiKey}).get().json();
      }

      return {
        edit,
        get,
      };
    }

    async function rdns(vmid: string, domain: string, ip_address: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/rdns`)
        .headers({AUTHORIZATION: apiKey})
        .body({
          domain,
          ip_address,
        })
        .post()
        .json();
    }

    async function noVNC(vmid: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/novnc`).headers({AUTHORIZATION: apiKey}).post().json();
    }

    async function remove(vmid: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/delete`).headers({AUTHORIZATION: apiKey}).delete().json();
    }

    async function status(vmid: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/status`).headers({AUTHORIZATION: apiKey}).get().json();
    }

    async function status_installation(vmid: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/status/installation`).headers({AUTHORIZATION: apiKey}).get().json();
    }

    async function reset_password(vmid: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/password-reset`).headers({AUTHORIZATION: apiKey}).post().json();
    }

    async function power(vmid: string, mode: "start" | "stop" | "restart") {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/power`)
        .headers({AUTHORIZATION: apiKey})
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

  public account() {
    const apiKey = this.apiKey;

    async function requests(offset?: number) {
      return await wretch(`https://live.fireapi.de/account/requests`)
        .headers({AUTHORIZATION: apiKey})
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

  public accounting() {
    const apiKey = this.apiKey;

    async function invoices() {
      return await wretch(`https://live.fireapi.de/accounting/invoices`).headers({AUTHORIZATION: apiKey}).get().json();
    }

    async function invoice(invoice_id: string) {
      return await wretch(`https://live.fireapi.de/accounting/invoices/${invoice_id}`).headers({AUTHORIZATION: apiKey}).get().json();
    }

    async function invoice_current() {
      return await wretch(`https://live.fireapi.de/accounting/invoices/current`).headers({AUTHORIZATION: apiKey}).get().json();
    }

    async function pricing() {
      return await wretch(`https://live.fireapi.de/accounting/pricings`).headers({AUTHORIZATION: apiKey}).get().json();
    }

    return {
      invoices,
      invoice,
      invoice_current,
      pricing,
    };
  }
}
