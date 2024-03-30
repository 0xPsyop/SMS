export default function AddStudents(){
    return(
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
              
                <div>
                  <h2 className="font-semibold text-xl text-gray-600">Responsive Form</h2>
                  <p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p>
        
                  <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      <div className="text-gray-600">
                        <p className="font-medium text-lg">Personal Details</p>
                        <p>Please fill out all the fields.</p>
                      </div>
        
                      <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                          <div className="md:col-span-5">
                            <label htmlFor="full_name">Full Name</label>
                            <input type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
                          </div>
        
                          {/* Other input fields go here */}
        
                          <div className="md:col-span-5 text-right">
                            <div className="inline-flex items-end">
                              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                            </div>
                          </div>
        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
          );
    
}