# **use-fetch**
Custom react hook for using fetch

## **Install**
```
npm install @chrishontoir/use-fetch
```

## **Usage**
```
const [loading, data, error, request] = useFetch();
```

### **loading**
Returns a boolean value indicating whether a fetch request is currently in progress.

### **data**
Returns the JSON value of the response body if the request was successful and has a status in the 2xx range, otherwise returns null.

### **error**
Returns the error thrown, the JSON value of the response body if the request has a status not in the 2xxx range, otherwise returns null.

### **request**
A function that allows the user to make a request to a URL.

## **Example**
```
import { useEffect, useState } from 'react';
import useFetch from '@chrishontoir/use-fetch';

const myComponent = () => {
  const [user, setUser] = useState(null);
  const [loading, data, error, request] = useFetch();

  useEffect(() => {
    request('http://localhost:3001/user-info);
  }, []);

  useEffect(() => {
    data && setUser(data);
  }, [data]);

  return {
    (error && <ErrorPage />) ||
    (loading && <LoadingSpinner />) ||
    (user && <h1>Hello {user.name}</h1>)
  }
}
```
