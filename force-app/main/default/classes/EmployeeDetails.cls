public class EmployeeDetails 
{
    public String Name;
    public String City;
    public Decimal Bonus,exp,Salary;
    public EmployeeDetails(Decimal Experience)
    {
        Name='Wipro';
        City='Hyd';
        exp=Experience;
    }
        public void setdata()
        {
            if(exp > 5)
            {
                Salary=50000;
                Bonus=5000;
            }else{
                Salary=30000;
                Bonus=3000;
            }
            
        } 
    public void view()
    {
        System.debug('Company Name :: '+Name);
        System.debug('Salary :: '+Salary);
        System.debug('Bonus :: '+Bonus);
    }     
}