import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { useError } from '@/providers/error-provider'

const Error = () => {

      const { error } = useError()

      if (!error) return null
  return (
    <Dialog>
        <DialogHeader></DialogHeader>
        <DialogContent>
            <p>There was Error {error} occured </p>
        </DialogContent>
    </Dialog>
  )
}
export default Error