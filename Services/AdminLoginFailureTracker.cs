namespace apli_website_rebuild.Services;

public sealed class AdminLoginFailureTracker
{
    private const int FailureThreshold = 5;
    private static readonly TimeSpan FailureWindow = TimeSpan.FromMinutes(10);
    private static readonly TimeSpan LockoutDuration = TimeSpan.FromMinutes(5);
    private readonly object syncRoot = new();
    private int failureCount;
    private DateTimeOffset? windowStartedAt;
    private DateTimeOffset? blockedUntil;

    public bool IsBlocked(DateTimeOffset now, out TimeSpan retryAfter)
    {
        lock (syncRoot)
        {
            if (blockedUntil is null)
            {
                retryAfter = TimeSpan.Zero;
                return false;
            }

            if (blockedUntil > now)
            {
                retryAfter = blockedUntil.Value - now;
                return true;
            }

            ResetUnsafe();
            retryAfter = TimeSpan.Zero;
            return false;
        }
    }

    public void RegisterFailure(DateTimeOffset now)
    {
        lock (syncRoot)
        {
            if (windowStartedAt is null || now - windowStartedAt.Value > FailureWindow)
            {
                failureCount = 0;
                windowStartedAt = now;
            }

            failureCount++;
            if (failureCount >= FailureThreshold)
            {
                blockedUntil = now + LockoutDuration;
            }
        }
    }

    public void RegisterSuccess()
    {
        lock (syncRoot)
        {
            ResetUnsafe();
        }
    }

    private void ResetUnsafe()
    {
        failureCount = 0;
        windowStartedAt = null;
        blockedUntil = null;
    }
}
