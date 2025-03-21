public class CustomObjectMonitorScheduler implements Schedulable {
    public void execute(SchedulableContext sc) {
        CustomObject monitor = new CustomObject();
        monitor.checkForNewCustomObjects();
        // Schedule the job (example: run daily at midnight)
        String sch = '0 0 0 * * ?';
        System.schedule('CustomObjectMonitorJob', sch, new CustomObjectMonitorScheduler());
    }
}