"use cleint"
import NavbarComponent from './../../components/dashboard/navbar/NavbarComponent';
import SidebarComponent from './../../components/dashboard/sidebar/SidebarComponent';

export default function page() {
  return (
    <>
    <div className="flex bg-background">


      <div className="flex-1 bg-secondary p-[20px]">

           <SidebarComponent/>
        </div>
      
        <div className="flex-4">
           <NavbarComponent/>
        </div>

        <div>

        </div>

    </div>
    
    
    {/* </> */}
    </>
  );
}