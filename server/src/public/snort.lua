
    ---------------------------------------------------------------------------
-- Snort++ configuration
---------------------------------------------------------------------------

---------------------------------------------------------------------------
-- 1. configure environment
---------------------------------------------------------------------------

-- this depends on LUA_PATH
-- used to load this conf into Snort
require('snort_config')

-- this depends on SNORT_LUA_PATH
-- where to find other config files
-- conf_dir = os.getenv('SNORT_LUA_PATH')
conf_dir = './etc/scripts'

if ( not conf_dir ) then
    conf_dir = '.'
end

---------------------------------------------------------------------------
-- 2. configure defaults
---------------------------------------------------------------------------

HOME_NET = '172.22.0.0/16'
EXTERNAL_NET = '! ' .. HOME_NET

KNX_NET = [[172.22.10.76/32 172.22.10.77/32]]
BAC_NET = [[172.22.11.76/32 172.22.11.77/32]]
ENO_NET = '172.22.13.76/32'

dofile(conf_dir .. '/snort_defaults.lua')
-- dofile(conf_dir .. '/file_magic.lua')

---------------------------------------------------------------------------
-- 3. configure inspection
---------------------------------------------------------------------------
stream = { }
stream_ip = { }
stream_tcp = { }
stream_udp = { }

knxnetip = 
{ 
    -- global_policy = 0,
    policies =
    {
        {
            
detection: true,
inspection: true,
individual_addressing: true,
group_address_level: 555,
header: true,
payload: true
            services = {
'321654987'},
            app_services = {
'364564654564',
'454564654654'},
        }
    },
    servers = 
    {
        from = '1.1.1.1',
        port = 254,
        to = '1111',
        policy = 001
    },
}

---------------------------------------------------------------------------
-- 4. configure bindings
---------------------------------------------------------------------------

binder =
{
    -- { when = { proto = 'udp', ports = '3671' }, use = { type = 'knxnetip' } },
    { when = { proto = 'any', ports = 'any' }, use = { type = 'knxnetip' } },
    -- { when = { service = 'knxnetip' },         use = { type = 'knxnetip' } }
}

---------------------------------------------------------------------------
-- 5. configure performance
---------------------------------------------------------------------------

-- perf_monitor = 
-- {
--     modules = {},
--     flow = true,
--     flow_ip = true,
--     cpu = true
-- }

---------------------------------------------------------------------------
-- 6. configure detection
---------------------------------------------------------------------------

references = default_references
classifications = default_classifications

ips =
{
    -- use this to enable decoder and inspector alerts
    enable_builtin_rules = true,
ip
    -- use include for rules files; be sure to set your path
    -- note that rules files can include other rules files
    --include = 'snort3_community.rules'
}

---------------------------------------------------------------------------
-- 7. configure filters
---------------------------------------------------------------------------

---------------------------------------------------------------------------
-- 8. configure outputs
---------------------------------------------------------------------------

-- event logging
-- you can enable with defaults from the command line with -A <alert_type>
-- uncomment below to set non-default configs
alert_csv = 
{
    file = true,
    fields = { action, class, gid }
}
alert_fast = 
{
    file = true,
    packet = true
}
alert_full = 
{
    file = true,
}
alert_sfsocket = { }
alert_syslog = { }
unified2 = { }
--  packet logging
-- you can enable with defaults from the command line with -L <log_type>
log_codecs = { 
    file = true,
    msg = true
}
log_hext = 
{
    file = true,
    raw = true
}
log_pcap = { }
--  additional logs
packet_capture = { }
file_log =
{
    log_pkt_time = true,
    log_sys_time = true,
}
    