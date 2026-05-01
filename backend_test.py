#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class CasinoSignalAPITester:
    def __init__(self, base_url="https://gaming-slots-hub-3.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            status = "✅ PASSED"
        else:
            status = "❌ FAILED"
        
        result = {
            "test": name,
            "status": "PASSED" if success else "FAILED",
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        print(f"{status} - {name}")
        if details:
            print(f"   Details: {details}")

    def test_api_health_check(self):
        """Test basic API health check at /api/"""
        try:
            url = f"{self.base_url}/api/"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("API Health Check", True, f"Status: {response.status_code}, Message: {data.get('message')}")
                    return True
                else:
                    self.log_test("API Health Check", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("API Health Check", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("API Health Check", False, f"Error: {str(e)}")
            return False

    def test_status_endpoints(self):
        """Test status check endpoints"""
        try:
            # Test POST /api/status
            url = f"{self.base_url}/api/status"
            test_data = {"client_name": "test_client_" + str(int(datetime.now().timestamp()))}
            
            response = requests.post(url, json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("client_name") == test_data["client_name"] and "id" in data and "timestamp" in data:
                    self.log_test("POST /api/status", True, f"Created status check with ID: {data.get('id')}")
                    
                    # Test GET /api/status
                    get_response = requests.get(url, timeout=10)
                    if get_response.status_code == 200:
                        get_data = get_response.json()
                        if isinstance(get_data, list) and len(get_data) > 0:
                            self.log_test("GET /api/status", True, f"Retrieved {len(get_data)} status checks")
                            return True
                        else:
                            self.log_test("GET /api/status", False, "No status checks returned")
                            return False
                    else:
                        self.log_test("GET /api/status", False, f"Status: {get_response.status_code}")
                        return False
                else:
                    self.log_test("POST /api/status", False, f"Invalid response structure: {data}")
                    return False
            else:
                self.log_test("POST /api/status", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Status Endpoints", False, f"Error: {str(e)}")
            return False

    def test_cors_headers(self):
        """Test CORS configuration"""
        try:
            url = f"{self.base_url}/api/"
            response = requests.options(url, timeout=10)
            
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            }
            
            if cors_headers['Access-Control-Allow-Origin']:
                self.log_test("CORS Configuration", True, f"CORS headers present: {cors_headers}")
                return True
            else:
                self.log_test("CORS Configuration", False, "CORS headers missing")
                return False
                
        except Exception as e:
            self.log_test("CORS Configuration", False, f"Error: {str(e)}")
            return False

    def test_api_response_times(self):
        """Test API response times"""
        try:
            url = f"{self.base_url}/api/"
            start_time = datetime.now()
            response = requests.get(url, timeout=10)
            end_time = datetime.now()
            
            response_time = (end_time - start_time).total_seconds()
            
            if response.status_code == 200 and response_time < 5.0:
                self.log_test("API Response Time", True, f"Response time: {response_time:.2f}s")
                return True
            else:
                self.log_test("API Response Time", False, f"Slow response: {response_time:.2f}s or error")
                return False
                
        except Exception as e:
            self.log_test("API Response Time", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Casino Signal Platform Backend Tests")
        print("=" * 60)
        
        # Test API health check
        self.test_api_health_check()
        
        # Test status endpoints
        self.test_status_endpoints()
        
        # Test CORS configuration
        self.test_cors_headers()
        
        # Test response times
        self.test_api_response_times()
        
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All backend tests passed!")
            return True
        else:
            print("⚠️  Some backend tests failed!")
            return False

    def get_test_results(self):
        """Return test results for reporting"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "results": self.test_results
        }

def main():
    """Main test execution"""
    tester = CasinoSignalAPITester()
    success = tester.run_all_tests()
    
    # Save results to file
    results = tester.get_test_results()
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())