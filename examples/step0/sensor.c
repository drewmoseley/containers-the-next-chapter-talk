#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>

#define DATA_FILE "/var/www/html/data.json"
#define INTERVAL  5

int main(void)
{
    while (1) {
        float load1 = 0, load5 = 0, load15 = 0;
        float uptime_sec = 0;
        long  temp_raw = 0;
        char  timebuf[64];
        time_t now;
        FILE *f;

        f = fopen("/proc/loadavg", "r");
        if (f) {
            fscanf(f, "%f %f %f", &load1, &load5, &load15);
            fclose(f);
        }

        f = fopen("/proc/uptime", "r");
        if (f) {
            fscanf(f, "%f", &uptime_sec);
            fclose(f);
        }

        /* /sys/class/thermal/thermal_zone0/temp is in millidegrees C */
        f = fopen("/sys/class/thermal/thermal_zone0/temp", "r");
        if (f) {
            fscanf(f, "%ld", &temp_raw);
            fclose(f);
        }

        time(&now);
        strftime(timebuf, sizeof(timebuf), "%Y-%m-%dT%H:%M:%SZ", gmtime(&now));

        f = fopen(DATA_FILE, "w");
        if (f) {
            fprintf(f,
                "{\n"
                "  \"timestamp\": \"%s\",\n"
                "  \"load_avg\": { \"1m\": %.2f, \"5m\": %.2f, \"15m\": %.2f },\n"
                "  \"uptime_seconds\": %.0f,\n"
                "  \"cpu_temp_c\": %.1f\n"
                "}\n",
                timebuf,
                load1, load5, load15,
                uptime_sec,
                temp_raw / 1000.0f);
            fclose(f);
        }

        sleep(INTERVAL);
    }

    return 0;
}
