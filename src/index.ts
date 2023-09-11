import wretch from "wretch";

/**
 * FireAPI - A simple wrapper for the 24Fire API
 */
export default class FireAPI {
  /**
   * The API key used for the requests
   */
  private readonly apiKey: string;

  /**
   * @param apiKey The API key used for the requests
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public additional() {
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
  public list() {
    const apiKey = this.apiKey;

    /**
     * @returns All available VMs
     */
    async function vm() {
      return await wretch("https://live.fireapi.de/vm/list")
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
      return await wretch("https://live.fireapi.de/vm/list/hosts")
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
      return await wretch("https://live.fireapi.de/vm/list/os")
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
      return await wretch("https://live.fireapi.de/vm/list/iso")
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
  public ddos(vmid: string) {
    const apiKey = this.apiKey;

    /**
     * @returns The current DDoS protection
     */
    async function get() {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/ddos/`).headers({AUTHORIZATION: apiKey}).get().json();
    }

    /**
     * @param layer4 The layer 4 DDoS protection
     * @param layer7 The layer 7 DDoS protection
     * @param ip_address The IP address for the DDoS protection
     * @returns The edited DDoS protection
     */
    async function edit(layer4?: string, layer7?: string, ip_address?: string) {
      /**
       * If no parameter is given, return
       */
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
  public backup(vmid: string) {
    const apiKey = this.apiKey;

    /**
     * @returns All available backups
     */
    async function get() {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/backup/list`).headers({AUTHORIZATION: apiKey}).get().json();
    }

    /**
     * @returns The created backup
     */
    async function create() {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/backup/create`).headers({AUTHORIZATION: apiKey}).post().json();
    }

    /**
     * @param backup_id The ID of the backup
     * @returns The status of the backup creation
     */
    async function create_status(backup_id: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/backup/create/status`)
        .headers({AUTHORIZATION: apiKey})
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
    async function restore(backup_id: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/backup/restore`)
        .headers({AUTHORIZATION: apiKey})
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
    async function restore_status(backup_id: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/backup/restore/status`)
        .headers({AUTHORIZATION: apiKey})
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
    async function remove(backup_id: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/backup/delete`)
        .headers({AUTHORIZATION: apiKey})
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
  public iso(vmid: string) {
    const apiKey = this.apiKey;

    /**
     * @param iso The ISO to attach
     * @returns The JSON Response
     */
    async function attach(
      iso:
        | "3cx_debian_10."
        | "arch_linux_23_08"
        | "centos_7"
        | "centos_9"
        | "fedora_38"
        | "proxmox_8"
        | "proxmox_backup_server_3"
        | "rocky_linux_9"
        | "system_rescue_cd",
    ) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/iso/`)
        .headers({AUTHORIZATION: apiKey})
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
      return await wretch(`https://live.fireapi.de/vm/${vmid}/iso/`).headers({AUTHORIZATION: apiKey}).delete().json();
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
  public vm() {
    const apiKey = this.apiKey;

    /**
     * @param vmid The ID of the VM
     * @param os The OS to reinstall
     * @returns The JSON Response
     */
    async function reinstall(vmid: string, os?: "debian_11" | "debian_12" | "ubuntu_22_10" | "ubuntu_22_04" | "centos_7" | "windows_server_2019") {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/reinstall`)
        .headers({AUTHORIZATION: apiKey})
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
    async function create(
      cores: number,
      mem: number,
      disk: number,
      os: "debian_11" | "debian_12" | "ubuntu_22_10" | "ubuntu_22_04" | "centos_7" | "windows_server_2019",
      hostsystem: "nl_xeon" | "nl_ryzen",
      ips?: number,
      backup_slots?: number,
      network_speed?: number,
    ) {
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

    /**
     * @param vmid The ID of the VM
     * @returns All available endpoints for the VM config
     */
    async function config(vmid: string) {
      /**
       * @returns The VM config
       */
      async function get() {
        return await wretch(`https://live.fireapi.de/vm/${vmid}/config`).headers({AUTHORIZATION: apiKey}).get().json();
      }

      /**
       * @param cores The amount of cores
       * @param mem The amount of memory
       * @param disk The amount of disk space
       * @param backup_slots The amount of backup slots
       * @param network_speed The network speed
       * @returns The edited VM config
       */
      async function edit(cores?: number, mem?: number, disk?: number, backup_slots?: number, network_speed?: number) {
        /**
         * If no parameter is given, return
         */
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

    /**
     * @param vmid The ID of the VM
     * @returns The JSON Response with link to the noVNC
     */
    async function noVNC(vmid: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/novnc`).headers({AUTHORIZATION: apiKey}).post().json();
    }

    /**
     * @param vmid The ID of the VM
     * @returns The JSON Response
     */
    async function remove(vmid: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/delete`).headers({AUTHORIZATION: apiKey}).delete().json();
    }

    /**
     * @param vmid The ID of the VM
     * @returns The Status of the VM
     */
    async function status(vmid: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/status`).headers({AUTHORIZATION: apiKey}).get().json();
    }

    /**
     * @param vmid The ID of the VM
     * @returns The Status of the VM installation
     */
    async function status_installation(vmid: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/status/installation`).headers({AUTHORIZATION: apiKey}).get().json();
    }

    /**
     * @param vmid The ID of the VM
     * @returns The JSON Response with the new password
     */
    async function reset_password(vmid: string) {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/password-reset`).headers({AUTHORIZATION: apiKey}).post().json();
    }

    /**
     * @param vmid The ID of the VM
     * @param mode The mode to power the VM
     * @returns The JSON Response
     */
    async function power(vmid: string, mode: "start" | "stop" | "restart") {
      return await wretch(`https://live.fireapi.de/vm/${vmid}/power`)
        .headers({AUTHORIZATION: apiKey})
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
  public account() {
    const apiKey = this.apiKey;

    /**
     * @returns All requests
     */
    async function requests(offset?: number) {
      return await wretch(`https://live.fireapi.de/account/requests`)
        .headers({AUTHORIZATION: apiKey})
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
  public accounting() {
    const apiKey = this.apiKey;

    /**
     * @returns All invoices
     */
    async function invoices() {
      return await wretch(`https://live.fireapi.de/accounting/invoices`).headers({AUTHORIZATION: apiKey}).get().json();
    }

    /**
     * @param invoice_id The ID of the invoice
     * @returns The invoice
     */
    async function invoice(invoice_id: string) {
      return await wretch(`https://live.fireapi.de/accounting/invoices/${invoice_id}`).headers({AUTHORIZATION: apiKey}).get().json();
    }

    /**
     * @returns The current invoice
     */
    async function invoice_current() {
      return await wretch(`https://live.fireapi.de/accounting/invoices/current`).headers({AUTHORIZATION: apiKey}).get().json();
    }

    /**
     * @returns All pricings
     */
    async function pricing() {
      return await wretch(`https://live.fireapi.de/accounting/pricings`).headers({AUTHORIZATION: apiKey}).get().json();
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
