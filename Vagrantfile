# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.define :page_specific_css do |page_specific_css_config|
        page_specific_css_config.vm.box = "Intracto/Debian81"

        page_specific_css_config.vm.provider "virtualbox" do |v|
            # show a display for easy debugging
            v.gui = false

            # RAM size
            v.memory = 2048

            # Allow symlinks on the shared folder
            v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
        end

        # allow external connections to the machine
        #page_specific_css_config.vm.forward_port 80, 8080

        # Shared folder over NFS
        config.vm.synced_folder ".", "/vagrant", type: "nfs", mount_options: %w{nolock,vers=3,udp,noatime,actimeo=1}

        page_specific_css_config.vm.network "private_network", ip: "192.168.33.10"

        # Shell provisioning
        page_specific_css_config.vm.provision :shell, :path => "shell_provisioner/run.sh"
    end
end
