export default function locate(){
    return new Promise<GeolocationPosition>((resolve, reject)=>{
            if(!navigator.geolocation) reject(new Error("Geolocation is not available. Make sure you have given location permission."))
            else{
                navigator.geolocation.getCurrentPosition((pos)=>{
                    resolve(pos);
                },
            (err)=>{
                reject(err);
            })
            }
        }
    );
}