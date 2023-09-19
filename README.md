# fitm-project
## 1. Introduce
## 2. Setup
- Step 1: Create database
	- Open appsettings.json then check username and password for access to database.
	- Open tools -> NuGet package manager -> Package manager console
	- Run command: Update-Database
## 3. Coding
- All controller must be extend ApiBase
- All Service must be extend ServiceBase and an interface to define service's method, Ex:
> MemberService must have IMemberService
## 4. Git
### Push 
- **Step 1**: Fetch and Pull code in branch **Main**
- Step 2: Create new branch from branch **Main**
- Step 3: Check out to new branch
- Step 4: Check change file then stage file change
- Step 5: Double check staged file changes
- Step 6: Commit staged file changes
- Step 7: Push commit
- Step 8: Access: https://github.com/pnquyen24/fitm-project
- Step 9: Create pull request