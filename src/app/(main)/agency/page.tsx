import AgencyDetails from "@/components/forms/agencydetails"
import Unauthorized from "@/components/unauthorized"
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries"
import { currentUser } from "@clerk/nextjs/server"
import { Plan } from "@prisma/client"
import { redirect } from "next/navigation"

const AgencyDashboard = async({searchParams}:{searchParams:{plan:Plan; state:string; code:string}}) => {    
    const agencyId = await verifyAndAcceptInvitation()

    const user = await getAuthUserDetails()
    if (agencyId) {
      if (user?.role === 'GUEST' || user?.role === 'USER') {
        return redirect('/subaccount');
      }else if (user?.role === 'OWNER' || user?.role === 'ADMIN'){
        if (searchParams.plan){
          return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`)
        }
        if (searchParams.state){
          const statePath = searchParams.state.split('__')[0];
          const stateAgencyId = searchParams.state.split('__')[1]
          if(!stateAgencyId) return <Unauthorized/>
          return redirect(`/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`)
        }else return redirect(`/agency/${agencyId}`)
      }else{
        return <Unauthorized/>
      }
    }
    
    const authUser = await currentUser()
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] border-[1px] p4 rounded-xl">
        <h1 className="text-4xl">Create An Agency</h1>
        <AgencyDetails data= {{companyEmail: authUser?.emailAddresses[0].emailAddress}}
        />
      </div>
    </div>
  )
}
 
export default AgencyDashboard
